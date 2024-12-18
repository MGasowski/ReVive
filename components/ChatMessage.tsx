import { View, Text } from 'react-native';
import React from 'react';

type ChatMessageProps = {
  text: string;
  createTime: Date;
  author: string;
  imageUrl: string;
};

const ChatMessage = ({ text, createTime, author, imageUrl }: ChatMessageProps) => {
  return (
    <View>
      <Text>ChatMessage</Text>
    </View>
  );
};

export default ChatMessage;
