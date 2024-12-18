import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { useMutation, useQuery } from 'convex/react';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

import TextInput from '~/components/TextInput';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';

const ChatScreen = () => {
  const { id } = useLocalSearchParams<{ id: Id<'chats'> }>();
  const [text, setText] = React.useState('');
  const currentUser = useQuery(api.user.currentUser);

  const messages = useQuery(api.chat.listMessages, { chatId: id });
  const sendMessage = useMutation(api.chat.addMessage);
  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        {messages?.map((message) => (
          <View
            className={clsx(
              message.user?._id === currentUser?._id ? 'mr-2 items-end' : 'ml-2 items-start'
            )}
            key={message._id}>
            <View className="mt-2 rounded-xl bg-blue-600 p-2 ">
              <Text className="text-white">{message.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row items-center gap-2 p-2 ">
        <View className="flex-1">
          <TextInput onChangeText={setText} value={text} placeholder="" />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!text) {
              return;
            }
            sendMessage({ chatId: id, text });
            setText('');
          }}
          className="h-8 w-8 items-center justify-center rounded bg-blue-400">
          <MaterialCommunityIcons name="send" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
