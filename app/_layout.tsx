import '../global.css';

import { Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { authStore } from '~/store/auth';
import { supabase } from '~/utils/supabase';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const [, setSession] = useAtom(authStore);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) setSession(session);
      else setSession(undefined);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
