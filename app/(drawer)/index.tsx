import { useQuery } from 'convex/react';
import { router } from 'expo-router';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingMapButton from '~/components/FloatingMapButton';
import ItemCard from '~/components/ItemCard';
import MyItemCard from '~/components/MyItemCard';
import Text from '~/components/Text';

import { api } from '~/convex/_generated/api';

export default function Home() {
  const messages = useQuery(api.items.list);
  const myItems = useQuery(api.items.myList);

  return (
    <>
      <FloatingMapButton />
      <ScrollView className="flex-1 ">
        <View className="mb-4 mt-8 px-6">
          <Text className="text-accent text-lg font-medium">My Items</Text>
        </View>
        <View className="mb-8 w-full">
          <FlatList
            className=" w-full  px-6"
            data={myItems}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => <MyItemCard item={item} />}
            keyExtractor={(item) => item._id}
            ListFooterComponent={<View className="w-[100px]" />}
          />
        </View>
        <View className="flex-1 px-6">
          <Text className="text-accent text-lg font-medium">Newest Nearby Items</Text>
          <FlatList
            className="flex-1"
            data={messages}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
    </>
  );
}
