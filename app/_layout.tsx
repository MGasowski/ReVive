import '../global.css';

import { Stack } from 'expo-router';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { loadAsync } from 'expo-font';

import { authStore } from '~/store/auth';
import ConvexProvider from '~/utils/convex';
import { supabase } from '~/utils/supabase';
import Splash from '~/components/Splash';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const [, setSession] = useAtom(authStore);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) setSession(session);
      else setSession(undefined);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const loadFonts = async () => {
      try {
        setTimeout(() => {
          setIsAppReady(true);
        }, 2000);
        await loadAsync(fonts);
      } catch (e) {
        console.log(e);
      }
    };
    loadFonts();
  }, []);
  if (!isAppReady) return <Splash />;
  return (
    <ConvexProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </Stack>
      </GestureHandlerRootView>
    </ConvexProvider>
  );
}

const fonts = {
  'Poppins-Black': require('assets/fonts/Poppins-Black.ttf'),
  'Poppins-BlackItalic': require('assets/fonts/Poppins-BlackItalic.ttf'),
  'Poppins-Bold': require('assets/fonts/Poppins-Bold.ttf'),
  'Poppins-BoldItalic': require('assets/fonts/Poppins-BoldItalic.ttf'),
  'Poppins-ExtraBold': require('assets/fonts/Poppins-ExtraBold.ttf'),
  'Poppins-ExtraBoldItalic': require('assets/fonts/Poppins-ExtraBoldItalic.ttf'),
  'Poppins-ExtraLight': require('assets/fonts/Poppins-ExtraLight.ttf'),
  'Poppins-ExtraLightItalic': require('assets/fonts/Poppins-ExtraLightItalic.ttf'),
  'Poppins-Italic': require('assets/fonts/Poppins-Italic.ttf'),
  'Poppins-Light': require('assets/fonts/Poppins-Light.ttf'),
  'Poppins-LightItalic': require('assets/fonts/Poppins-LightItalic.ttf'),
  'Poppins-Medium': require('assets/fonts/Poppins-Medium.ttf'),
  'Poppins-MediumItalic': require('assets/fonts/Poppins-MediumItalic.ttf'),
  'Poppins-Regular': require('assets/fonts/Poppins-Regular.ttf'),
  'Poppins-SemiBold': require('assets/fonts/Poppins-SemiBold.ttf'),
  'Poppins-SemiBoldItalic': require('assets/fonts/Poppins-SemiBoldItalic.ttf'),
  'Poppins-Thin': require('assets/fonts/Poppins-Thin.ttf'),
  'Poppins-ThinItalic': require('assets/fonts/Poppins-ThinItalic.ttf'),
};
