import { useAuthActions } from '@convex-dev/auth/react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Authenticated, Unauthenticated, useMutation, useQuery } from 'convex/react';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useCallback } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import { Button } from '~/components/Button';
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

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useAuthActions();
  const user = useQuery(api.user.currentUser);
  const deleteUser = useMutation(api.user.deleteUser);

  const handleDeleteUser = useCallback(async () => {
    Alert.alert('Delete account', 'Are you sure you want to delete your account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteUser();
          signOut();
        },
      },
    ]);
  }, []);

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
      <TouchableOpacity onPress={handleDeleteUser}>
        <Text className="text-center text-sm text-gray-400">Delete account</Text>
      </TouchableOpacity>
    </View>
  );
};
