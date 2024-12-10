import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const AddItemLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="address-picker"
        options={{
          presentation: 'modal',
          header: () => (
            <View className="h-32 bg-white p-4">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 20,
                  borderColor: '#ccc',
                  padding: 5,
                }}>
                <MaterialIcons name="search" size={28} color="gray" />
                <TextInput
                  placeholder="Find address"
                  style={{ flex: 1, marginLeft: 5 }}
                  className="text-2xl"
                />
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default AddItemLayout;
