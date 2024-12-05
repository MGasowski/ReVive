import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import { router } from 'expo-router';

const ItemCard = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/(drawer)/${item._id}`);
      }}>
      <View className="mb-6 h-[100px] rounded-lg bg-white p-2 shadow-sm">
        <View className="flex-1 flex-row gap-4">
          <Animated.Image className="h-full w-[100px] rounded-lg" source={{ uri: item.url }} />
          <View className="flex-1 justify-between">
            <View>
              <Text className="text-lg font-semibold text-accent">{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <Text className="text-gray-500">author</Text>
          </View>
          <View className="items-center justify-center  pr-4">
            <View className="rounded-xl bg-accent p-2">
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
