import { useAuthActions } from '@convex-dev/auth/dist/react';
import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import Text from '~/components/Text';
import TextInput from '~/components/TextInput';

const Login = () => {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<'signUp' | 'signIn'>('signUp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 items-center bg-[#70B9BE]" style={{ paddingTop: top }}>
      <View className="w-full items-end pr-4"></View>
      <Text className="h-auto pt-4 font-Poppins text-5xl font-bold text-white">ReVive</Text>
      <Text className="text-lg text-white">Give your items a second life!</Text>
      <Animated.View
        entering={SlideInDown}
        className="mt-16 w-full flex-1  items-center rounded-t-3xl bg-white/25 pt-4">
        <KeyboardAvoidingView
          behavior="padding"
          className=" w-full flex-1  items-center rounded-t-3xl bg-white ">
          <View className="w-full gap-4 p-4">
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
              inputMode="email"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </View>
          <View className="w-full px-4">
            <Button
              className="w-full"
              title={step === 'signIn' ? 'Sign in' : 'Sign up'}
              onPress={() => {
                signIn('password', { email, password, flow: step });
              }}
            />
          </View>
        </KeyboardAvoidingView>
        {/* <Button
          title={step === 'signIn' ? 'Sign up instead' : 'Sign in instead'}
          onPress={() => setStep(step === 'signIn' ? 'signUp' : 'signIn')}
        /> */}
      </Animated.View>
    </View>
  );
};

export default Login;
