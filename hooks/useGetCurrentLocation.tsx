import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useGetCurrentLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location };
};

export default useGetCurrentLocation;
