import { useQuery } from 'convex/react';
import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { api } from '~/convex/_generated/api';

export default function Home() {
  const imageHeight = useSharedValue(100); // Initial height

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(imageHeight.value), // Smooth transition
    };
  });
  const messages = useQuery(api.items.list);
  const myItems = useQuery(api.items.myList); // Fetch 'My Items'

  console.log(messages);
  return (
    <View className="flex-1">
      {/* Horizontal List for My Items */}
      <FlatList
        data={messages}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(drawer)/${item._id}`)}>
            <Animated.Image
              style={animatedStyle}
              className="w-30 h-30"
              source={{
                uri: item.url!,
              }}
            />
            <Text>{item.author}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />

      {/* Vertical List for All Items */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(drawer)/${item._id}`)}>
            <Animated.Image
              style={animatedStyle}
              className="w-30 h-30"
              source={{
                uri: item.url!,
              }}
            />
            <Text>{item.author}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
