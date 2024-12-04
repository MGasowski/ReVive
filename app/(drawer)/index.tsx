import { useQuery } from 'convex/react';
import { FlatList, Image, Text, View } from 'react-native';

import { api } from '~/convex/_generated/api';

export default function Home() {
  const messages = useQuery(api.messages.list);
  console.log(messages);
  return (
    <View className="flex-1">
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.url! }}
              className="h-24 w-full rounded-md"
              resizeMode="cover"
            />
            <Image
              className="w-30 h-30"
              source={{
                uri: item.url!,
              }}
            />
            <Text>{item.author}</Text>
          </View>
        )}
      />
    </View>
  );
}
