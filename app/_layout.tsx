import '../global.css';

import { loadAsync } from 'expo-font';
import { router, Stack, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Splash from '~/components/Splash';
import ConvexProvider from '~/utils/convex';
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useNotificationObserver();
  const [isAppReady, setIsAppReady] = useState(false);
  const segmentClient = useSegments();
  console.log(segmentClient);
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

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
