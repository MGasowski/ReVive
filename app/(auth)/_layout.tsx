import { View, Text } from 'react-native';
import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { authStore } from '~/store/auth';
import { useAtom } from 'jotai';

const AuthLayout = () => {
  const [session] = useAtom(authStore);
  if (session) return <Redirect href="/(drawer)" />;
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AuthLayout;
