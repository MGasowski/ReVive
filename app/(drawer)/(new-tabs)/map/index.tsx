import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FloatingMapButton from '~/components/FloatingMapButton';
import ItemCard from '~/components/ItemCard';
import MyItemCard from '~/components/MyItemCard';
import Text from '~/components/Text';

import { api } from '~/convex/_generated/api';
import { itemSearchStore } from '~/store/itemSearch';

export default function Home() {
  const [search] = useAtom(itemSearchStore);
  const messages = useQuery(api.items.list, {
    search,
  });
  const myItems = useQuery(api.items.myList, {
    search,
  });

  return (
    <>
      <ScrollView className="flex-1 ">
        <View className="mb-4 mt-8 px-6">
          <Text className="text-lg font-medium text-accent">My Items</Text>
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
          <Text className="text-lg font-medium text-accent">Newest Nearby Items</Text>
          <FlatList
            className="my-4 flex-1"
            data={messages}
            renderItem={({ item }) => (
              <ItemCard
                item={item}
                onPress={() => router.push(`/(drawer)/(new-tabs)/map/${item._id}`)}
                className="mb-4"
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
      <FloatingMapButton />
    </>
  );
}
