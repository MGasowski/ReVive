import { useQuery } from 'convex/react';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { api } from '~/convex/_generated/api';

const Chat = () => {
  const chats = useQuery(api.chat.myChats);
  console.log(chats);
  return (
    <ScrollView>
      {chats?.map((chat) => (
        <TouchableOpacity
          key={chat._id}
          onPress={() =>
            router.push({
              pathname: '/(drawer)/(new-tabs)/chat/[id]',
              params: { id: chat._id, name: chat.item?.name },
            })
          }>
          <View key={chat._id} className="m-2 flex-row gap-4">
            <Image source={{ uri: chat.url }} className="h-16 w-16 rounded-full" />
            <View className="flex-1 justify-center">
              <Text className="font-semibold">{chat.item?.name}</Text>
              <Text className="text-gray-500">
                {chat?.lastMessage?.text ?? 'Press to open chat'}
              </Text>
            </View>
            <View className="items-end justify-center">
              <Text className="text-gray-500">{chat.itemOwner?.name}</Text>
              <Text className="text-gray-500">
                {new Date(+(chat.lastMessage?._creationTime ?? chat._creationTime)).toDateString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Chat;
