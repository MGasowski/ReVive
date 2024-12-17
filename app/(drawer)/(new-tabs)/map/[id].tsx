import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '~/components/Avatar';
import { Button } from '~/components/Button';
import Comments from '~/components/Comments';
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
  const deleteItem = useMutation(api.items.deleteItem);
  const currentUser = useQuery(api.user.currentUser);
  const makeUnavailable = useMutation(api.items.makeUnavailable);
  const makeAvailable = useMutation(api.items.makeAvailable);
  const cancelReservation = useMutation(api.items.cancelReservation);

  const [isOpen, setIsOpen] = useState(false);
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
                {!item?.reservable &&
                  item?.status === 'available' &&
                  currentUser?._id !== item?.author && (
                    <Button title="Want it!" onPress={() => reserve({ id: item._id! })} />
                  )}
              </View>
              <Status status={item?.status ?? 'available'} />

              <Button onPress={() => setIsOpen((prev) => !prev)} title="Options" />
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
        {isOpen && (
          <Animated.View
            className="z-1000 absolute right-4 top-96  items-center justify-center gap-2 "
            entering={FadeIn}
            exiting={FadeOut}>
            <View className="w-full">
              <Button
                title="Delete"
                onPress={() => {
                  deleteItem({ id: item?._id! });
                  router.back();
                }}
                className="shadow-black"
              />
            </View>
            <View className="w-full">
              <Button
                title="Make unavailable"
                onPress={() => makeUnavailable({ id: item?._id! })}
                className="shadow-black"
              />
            </View>
            <View className="w-full">
              <Button
                title="Make available"
                onPress={() => makeAvailable({ id: item?._id! })}
                className="shadow-black"
              />
            </View>
            <View className="w-full">
              <Button
                title="Cancel reservation"
                onPress={() => cancelReservation({ id: item?._id! }).then(() => router.back())}
                className="shadow-black"
              />
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ItemDetails;
