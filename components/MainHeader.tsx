import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useQuery } from 'convex/react';
import { useAtom } from 'jotai';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '~/convex/_generated/api';
import { itemSearchStore } from '~/store/itemSearch';

const MainHeader = () => {
  const user = useQuery(api.user.currentUser);
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useAtom(itemSearchStore);
  return (
    <View className="px-6 pb-2" style={{ paddingTop: top }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg text-accent">Good Morning</Text>
          <Text className="text-2xl font-semibold text-accent">{user?.name}</Text>
        </View>
        <DrawerToggleButton />
      </View>

      <View className="mx-2 mt-4 flex-row gap-2 rounded-full border border-accent bg-slate-200 px-4 py-2">
        <MaterialCommunityIcons name="magnify" size={24} color="black" />
        <TextInput
          placeholder="Find your future favourite item"
          className="flex-1"
          onChangeText={(text) => setSearch(text)}
          value={search}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

export default MainHeader;
