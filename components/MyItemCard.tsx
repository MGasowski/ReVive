import { router } from 'expo-router';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import Text from './Text';

const MyItemCard = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity
      className="mr-8 h-[170px] w-[300px] shadow-md"
      onPress={() => router.push(`/(drawer)/${item._id}`)}>
      <View className="absolute">
        <Animated.Image
          className="h-[170px] w-[300px] rounded-lg"
          source={{
            uri: item.url!,
          }}
        />
      </View>
      <View className="flex-1 justify-end ">
        <View className="rounded-lg bg-gray-800/40 p-4">
          <Text className=" text-lg font-semibold text-white">{item.name}</Text>
          <Text className="text-white">{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyItemCard;
