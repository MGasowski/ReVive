import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { DrawerContent } from '../../_layout';

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
        options={{
          headerTitle: 'Chat',
          drawerLabel: 'Chat',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
    </Drawer>
  );
};

export default ChatLayout;
