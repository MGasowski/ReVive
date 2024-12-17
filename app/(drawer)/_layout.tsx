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
import MainHeader from '~/components/MainHeader';
import Text from '~/components/Text';
import { api } from '~/convex/_generated/api';

const DrawerLayout = () => {
  return (
    <>
      <Authenticated>
        <Drawer drawerContent={DrawerContent}>
          <Drawer.Screen
            name="(new-tabs)"
            options={{
              headerShown: false,
            }}
          />
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
  const user = useQuery(api.user.currentUser);

  return (
    <View className="flex-1">
      <DrawerContentScrollView>
        <View className="mb-8 px-6 pb-2">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-lg text-accent">Good Morning</Text>
              <Text className="text-2xl font-semibold text-accent">{user?.name}</Text>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button title="Logout" className="m-8" onPress={() => signOut()} />
    </View>
  );
};
