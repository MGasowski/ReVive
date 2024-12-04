import { useMutation } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import MapThumbnail from '~/components/MapThumbnail';

import Parallax from '~/components/Parallax';
import { api } from '~/convex/_generated/api';

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const generateUploadUrl = useMutation(api.items.generateUploadUrl);
  const sendImage = useMutation(api.items.sendImage);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

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
          quality: 0.3,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
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
    await sendImage({
      storageId,
      name,
      description,
      location: { lat: location?.coords.latitude!, lng: location?.coords.longitude! },
    });
    router.replace('/');
  };

  return (
    <View className="flex-1">
      <Parallax imageUrl={image?.uri} onBack={() => router.back()} onImagePress={pickImage}>
        <View className="mb-4">
          <TextInput
            className="rounded-md p-2 text-3xl"
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
          />
        </View>

        <View className="mb-4">
          <TextInput
            className="rounded-md bg-gray-100 p-2"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter item description"
            multiline
          />
        </View>

        <MapThumbnail lat={location?.coords.latitude!} lng={location?.coords.longitude!} />

        <Button title="Submit" onPress={handleSubmit} disabled={!name || !description} />
      </Parallax>
    </View>
  );
}
