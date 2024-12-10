import React from 'react';
import { Image, View } from 'react-native';
import Text from './Text';
import { MaterialIcons } from '@expo/vector-icons';

interface AvatarProps {
  url?: string;
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ url, name }) => {
  return (
    <View className="flex-row items-center gap-2">
      <View className="rounded-full bg-gray-200 p-2">
        {url ? (
          <Image source={{ uri: url }} alt="User Avatar" />
        ) : (
          <MaterialIcons name="person" size={24} color="black" />
        )}
      </View>
      <Text className="font-medium">{name}</Text>
    </View>
  );
};

export default Avatar;
