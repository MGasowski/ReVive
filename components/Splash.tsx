import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

import Text from './Text';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Splash = () => {
  return (
    <Animated.View className="flex-1 items-center justify-center bg-[#70B9BE]">
      <Animated.View entering={ZoomIn.springify()} className="items-cen ter  flex-1 justify-center">
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require('~/animations/box.json')}
        />
        <Text className="text-3xl font-bold text-black">Welcome Back</Text>
        <Text className="text-lg text-gray-500">Enter your details below</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Splash;
