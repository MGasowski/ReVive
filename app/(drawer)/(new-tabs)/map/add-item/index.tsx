import { MaterialCommunityIcons } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import clsx from 'clsx';
import { useMutation } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button } from '~/components/Button';
import Separator from '~/components/Separator';
import { api } from '~/convex/_generated/api';
import {
  addressAtom,
  clearStoreAtom,
  descriptionAtom,
  imageAtom,
  locationAtom,
  nameAtom,
  reservableAtom,
} from '~/store/add-item';

export default function AddItemScreen() {
  const [name, setName] = useAtom(nameAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [image, setImage] = useAtom(imageAtom);
  const [reservable, setReservable] = useAtom(reservableAtom);
  const [location] = useAtom(locationAtom);
  const [address] = useAtom(addressAtom);
  const clearStore = useSetAtom(clearStoreAtom); // Clear handler

  const generateUploadUrl = useMutation(api.items.generateUploadUrl);
  const sendImage = useMutation(api.items.sendImage);

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
      reservable,
      location: { lat: location?.coords.latitude!, lng: location?.coords.longitude! },
    });
    clearStore();
    router.replace('/');
  };

  const handleBack = () => {
    Alert.alert('Are you sure you want to go back?', 'You will lose all your progress', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Go Back',
        onPress: () => {
          // setImage(null);
          // setName('');
          // setDescription('');
          clearStore();
          router.back();
        },
      },
    ]);
  };

  const handlePickImage = () => {
    Alert.alert('Pick an image', 'Choose a source', [
      { text: 'Camera', onPress: () => pickImage(true) },
      { text: 'Gallery', onPress: () => pickImage(false) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity
        onPress={handleBack}
        className="absolute left-8 top-16 z-10 rounded-full bg-gray-500 p-4">
        <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePickImage}>
        <View className="h-[300px] items-center justify-center bg-gray-400">
          {image ? (
            <Image source={{ uri: image.uri }} className="h-full w-full" />
          ) : (
            <MaterialCommunityIcons name="camera" size={48} color="black" />
          )}
        </View>
      </TouchableOpacity>

      <KeyboardAvoidingView behavior="padding" className="flex-1 gap-4 rounded-t-lg bg-white p-4">
        <View className="">
          {/* <Text className="text-lg  text-gray-500">Can be reserved?</Text> */}
          <SegmentedControl
            values={['Allow Reservations', 'First Come, First Served']}
            selectedIndex={reservable ? 1 : 0}
            onChange={(event) => {
              setReservable(!!event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        <View>
          <Text className="text-lg  text-gray-500">Name</Text>
          <TextInput
            className="rounded-md border border-gray-300 bg-gray-200 p-1 text-3xl"
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
          />
        </View>
        <View className="">
          <Text className="text-lg  text-gray-500">Description</Text>

          <TextInput
            className="min-h-32 rounded-md bg-gray-200 "
            value={description}
            onChangeText={setDescription}
            placeholder="Enter item description"
            multiline
          />
        </View>

        <View className="flex-1 gap-4">
          <Text className="text-lg  text-gray-500">Location</Text>

          <View className="flex-row items-center justify-between gap-4">
            {address && <Text className="text-gray-500">{address}</Text>}
            <Button
              title={address ? 'Change Address' : 'Pick Address'}
              className="bg-primary"
              onPress={() => router.push('/(drawer)/(new-tabs)/map/add-item/address-picker')}
            />
          </View>
          <Separator />
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!name || !description}
            className={clsx(
              !name || !description || !location ? 'bg-gray-500' : 'bg-primary',
              'rounded-lg p-4'
            )}
          />
        </View>
      </KeyboardAvoidingView>
      {/* </Parallax> */}
    </ScrollView>
  );
}
