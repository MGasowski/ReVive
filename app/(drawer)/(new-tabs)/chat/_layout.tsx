import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { DrawerContent } from '../../_layout';
import { View } from 'react-native';
import { router } from 'expo-router';

const ChatLayout = () => {
  return (
    <Drawer drawerContent={DrawerContent}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'All Chats',
          drawerLabel: 'All Chats',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Drawer.Screen
        name="[id]"
        options={({ route }) => ({
          // @ts-ignore
          title: route.params?.name ?? 'Chat',
          drawerLabel: 'Chat',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
          headerLeft: () => (
            <View>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                onPress={() => router.replace('..')}
              />
            </View>
          ),
        })}
      />
    </Drawer>
  );
};

export default ChatLayout;
