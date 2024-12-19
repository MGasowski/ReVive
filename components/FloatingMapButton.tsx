import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FloatingMapButton = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push('/(drawer)/(new-tabs)/map/mapList');
      }}
      className="z-100 absolute bottom-8 right-8">
      <View>
        <View className="rounded-full bg-accent p-4">
          <Ionicons name="map-outline" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingMapButton;
