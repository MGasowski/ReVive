import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAtom } from 'jotai';
import { View } from 'react-native';

import { HeaderButton } from '../../components/HeaderButton';

import { Button } from '~/components/Button';
import { authStore } from '~/store/auth';
import { supabase } from '~/utils/supabase';

const DrawerLayout = () => {
  const [session] = useAtom(authStore);
  if (!session) return <Redirect href="/(auth)" />;
  return (
    <Drawer drawerContent={DrawerContent}>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="add-item"
        options={{
          headerTitle: 'Add Item',
          drawerLabel: 'Add Item',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View className="flex-1">
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button title="Logout" className="m-8" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};
