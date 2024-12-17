import { Authenticated, Unauthenticated } from 'convex/react';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  return (
    <>
      <Unauthenticated>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </Unauthenticated>
      <Authenticated>
        <Redirect href="/(drawer)/(new-tabs)/map" />
      </Authenticated>
    </>
  );
};

export default AuthLayout;
