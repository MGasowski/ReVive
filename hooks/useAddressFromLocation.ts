import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useAddressFromLocation = ({ lat, lng }: { lat: number; lng: number }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const getAddress = async () => {
      const address = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      console.log(address, 'address', lat, lng);
      setAddress(address[0].name);
    };
    getAddress();
  }, [lat, lng]);

  return address;
};
