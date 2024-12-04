import { useAuthActions } from '@convex-dev/auth/react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { Link, Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';

import { HeaderButton } from '../../components/HeaderButton';

import { Button } from '~/components/Button';
import Text from '~/components/Text';
import { api } from '~/convex/_generated/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DrawerLayout = () => {
  const user = useQuery(api.user.currentUser);
  const { top } = useSafeAreaInsets();
  return (
    <>
      <Authenticated>
        <Drawer drawerContent={DrawerContent}>
          <Drawer.Screen
            name="index"
            options={{
              headerTitle: 'Home',
              drawerLabel: 'Home',
              drawerIcon: ({ size, color }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),

              header: () => (
                <View className="px-6 " style={{ paddingTop: top }}>
                  <Text className="text-accent text-lg">Good Morning</Text>
                  <Text className="text-accent text-2xl font-semibold">{user?.name}</Text>
                </View>
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
              headerShown: false,
              headerTitle: 'Add Item',
              drawerLabel: 'Add Item',
              drawerIcon: ({ size, color }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen name="[id]" options={{ headerShown: false }} />
        </Drawer>
      </Authenticated>
      <Unauthenticated>
        <Redirect href="/(auth)" />
      </Unauthenticated>
    </>
  );
};

export default DrawerLayout;

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useAuthActions();

  return (
    <View className="flex-1">
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button title="Logout" className="m-8" onPress={() => signOut()} />
    </View>
  );
};
