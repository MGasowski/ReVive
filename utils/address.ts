import * as Location from 'expo-location';

export const getAddressFromLocation = async ({ lat, lng }: { lat: number; lng: number }) => {
  const address = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
  return address[0].name;
};
