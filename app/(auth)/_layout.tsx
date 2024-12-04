import { Authenticated, Unauthenticated } from 'convex/react';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  return (
    <>
      <Unauthenticated>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </Unauthenticated>
      <Authenticated>
        <Redirect href="/(drawer)" />
      </Authenticated>
    </>
  );
};

export default AuthLayout;
