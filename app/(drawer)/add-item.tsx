import { useMutation } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button, View, TextInput, Text, Image } from 'react-native';

import { api } from '~/convex/_generated/api';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);

  const pickImage = async (useCamera: boolean) => {
    // Request permission
    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(`Please grant ${useCamera ? 'camera' : 'gallery'} access to continue`);
      return;
    }

    // Launch camera or image picker
    const result = useCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    console.log({ name, description, image });

    const postUrl = await generateUploadUrl();
    const imageFile = await fetch(image!.uri).then((res) => res.blob());

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': image!.mimeType! },
      body: imageFile,
    });
    const { storageId } = await result.json();
    await sendImage({ storageId, author: name });

    // TODO: Implement form submission
  };

  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Add New Item' }} />

      <View className="space-y-4">
        <View>
          <Text className="mb-1 text-gray-700">Name</Text>
          <TextInput
            className="rounded-md border border-gray-300 p-2"
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
          />
        </View>

        <View>
          <Text className="mb-1 text-gray-700">Description</Text>
          <TextInput
            className="h-24 rounded-md border border-gray-300 p-2"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter item description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View className="flex-row space-x-2">
          <Button title="Pick from Gallery" onPress={() => pickImage(false)} />
          <Button title="Take Photo" onPress={() => pickImage(true)} />
        </View>

        {image && (
          <Image
            source={{ uri: image.uri }}
            className="h-24 w-full rounded-md"
            resizeMode="cover"
          />
        )}

        <Button title="Submit" onPress={handleSubmit} disabled={!name || !description} />
      </View>
    </View>
  );
}
