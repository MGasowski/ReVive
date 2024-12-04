import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const FloatingMapButton = () => {
  return (
    <View className="absolute bottom-8 right-8">
      <View className="bg-accent rounded-full p-4">
        <Ionicons name="map-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default FloatingMapButton;
