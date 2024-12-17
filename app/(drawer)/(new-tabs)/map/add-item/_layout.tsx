import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const AddItemLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="address-picker"
        options={{
          presentation: 'modal',
          title: 'Pick an address',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AddItemLayout;
