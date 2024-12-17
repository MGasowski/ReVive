import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Text from './Text';
import clsx from 'clsx';

const ItemCard = ({
  item,
  onPress,
  className,
}: {
  item: any;
  onPress: () => void;
  className?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={clsx(' h-[100px] rounded-lg bg-white p-2', className)}>
        <View className="flex-1 flex-row gap-4">
          <Animated.Image className="h-full w-[100px] rounded-lg" source={{ uri: item.url }} />
          <View className="flex-1 justify-between">
            <View className="w-2/3 flex-1">
              <Text className="text-lg font-semibold text-accent">{item.name}</Text>
              <Text ellipsizeMode="tail" numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <Text className="text-gray-500">{item.author.name}</Text>
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
