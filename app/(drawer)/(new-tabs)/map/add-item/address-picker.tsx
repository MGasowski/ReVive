import { router } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Button } from '~/components/Button';
import useGetCurrentLocation from '~/hooks/useGetCurrentLocation';
import { addressAtom, locationAtom } from '~/store/add-item';
import { getAddressFromLocation } from '~/utils/address';

const AddressPicker = () => {
  const { location } = useGetCurrentLocation();
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [, setAtomAddress] = useAtom(addressAtom);
  const mapRef = useRef<MapView>(null);
  const [, setLocation] = useAtom(locationAtom);
  useEffect(() => {
    if (location) {
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });
    }
  }, [location]);

  return (
    <>
      <View className="flex-1">
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          ref={mapRef}
          zoomControlEnabled
          style={{ flex: 1 }}
          initialRegion={initialRegion ?? undefined}
          showsUserLocation
          onRegionChange={setSelectedRegion}
          onRegionChangeComplete={async (region) => {
            const address = await getAddressFromLocation({
              lat: region.latitude,
              lng: region.longitude,
            });
            setAddress(address);
          }}>
          {selectedRegion && (
            <Marker
              coordinate={{
                latitude: selectedRegion.latitude,
                longitude: selectedRegion.longitude,
              }}
              title={address ?? ''}
              draggable
            />
          )}
        </MapView>
        {address && selectedRegion && (
          <View className="absolute bottom-16 w-full p-4">
            <View className="flex-1 flex-row items-center justify-between rounded-lg bg-white p-4 shadow">
              {selectedRegion && <Text>{address}</Text>}
              <Button
                title="select"
                onPress={() => {
                  setLocation({
                    coords: {
                      latitude: selectedRegion.latitude,
                      longitude: selectedRegion.longitude,
                      accuracy: 0,
                      altitude: 0,
                      altitudeAccuracy: 0,
                      heading: 0,
                      speed: 0,
                    },
                    timestamp: 0,
                  });
                  setAtomAddress(address);
                  router.back();
                }}
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default AddressPicker;
