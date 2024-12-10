import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Comments from '../../components/Comments';

import Avatar from '~/components/Avatar';
import { Button } from '~/components/Button';
import MapThumbnail from '~/components/MapThumbnail';
import Separator from '~/components/Separator';
import Status from '~/components/Status';
import Text from '~/components/Text';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';
import { useAddressFromLocation } from '~/hooks/useAddressFromLocation';

const ItemDetails = () => {
  const { id } = useLocalSearchParams<{ id: Id<'items'> }>();
  const item = useQuery(api.items.getItem, { id });
  const author = useQuery(api.user.getUser, { id: item?.author! });
  const reserve = useMutation(api.items.reserve);
  const { bottom } = useSafeAreaInsets();
  const address = useAddressFromLocation({
    lat: item?.location?.lat ?? 0,
    lng: item?.location?.lng ?? 0,
  });
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView contentContainerStyle={{ paddingBottom: bottom }}>
        <View className={` ${isKeyboardVisible ? 'hidden' : 'mb-2'}`}>
          <View>
            <Image source={{ uri: item?.url ?? '' }} style={{ height: 300 }} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 50,
                left: 20,
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 10,
                elevation: 5,
              }}
              onPress={() => navigation.goBack()}>
              <MaterialIcons name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            <View className="z-100 absolute bottom-0 -mb-4 w-full flex-row justify-end gap-4  pr-4">
              <View className="">
                {!item?.reservable && item?.status === 'available' && (
                  <Button title="Want it!" onPress={() => reserve({ id: item._id! })} />
                )}
              </View>
              <Status status={item?.status ?? 'available'} />
            </View>
          </View>
        </View>
        <View>
          <View className="px-4">
            <Text className="text-sm text-gray-500">
              {new Date(item?._creationTime ?? 0).toLocaleString()}
            </Text>

            <Text className="pt-2 text-3xl font-bold text-accent">{item?.name}</Text>
            <Text>{item?.description}</Text>
          </View>
          <Separator />

          <View className="flex-row items-center justify-center pl-4">
            <View className="flex-1">
              <Avatar url={author?.image} name={author?.name ?? ''} />
              <View className="flex-row gap-2">
                <View className="rounded-full bg-gray-200 p-2 ">
                  <MaterialIcons name="location-on" size={24} color="black" />
                </View>
                <Text className="pt-2 text-gray-700">{address}</Text>
              </View>
            </View>
            <View className="flex-1">
              <MapThumbnail lat={item?.location?.lat ?? 0} lng={item?.location?.lng ?? 0} />
            </View>
          </View>

          <Separator />
          <Comments itemId={id} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ItemDetails;
