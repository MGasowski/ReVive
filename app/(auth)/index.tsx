import { useAuthActions } from '@convex-dev/auth/dist/react';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const Login = () => {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<'signUp' | 'signIn'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
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
      <Button
        title={step === 'signIn' ? 'Sign in' : 'Sign up'}
        onPress={() => {
          signIn('password', { email, password, flow: step });
        }}
      />
      <Button
        title={step === 'signIn' ? 'Sign up instead' : 'Sign in instead'}
        onPress={() => setStep(step === 'signIn' ? 'signUp' : 'signIn')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    padding: 20,
    backgroundColor: '#151515',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 50,
    color: '#fff',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#2b825b',
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: '#363636',
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#2b825b',
    padding: 12,
    borderRadius: 4,
  },
});

export default Login;
