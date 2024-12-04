import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  InputModeOptions,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package

const TextInput = ({
  value,
  onChangeText,
  secureTextEntry = false,
  placeholder,
  inputMode = 'text',
  autoCapitalize,
}: {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder: string;
  inputMode?: InputModeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="w-full rounded-lg border border-gray-400 bg-white p-2.5">
      <Text className="absolute left-2.5 text-xs text-gray-500">{placeholder}</Text>
      <View className="flex-row items-center">
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordVisible}
          className="h-10 flex-1"
          placeholder={placeholder}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;
