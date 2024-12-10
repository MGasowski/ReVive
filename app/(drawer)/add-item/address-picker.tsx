import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import useGetCurrentLocation from '~/hooks/useGetCurrentLocation';

const AddressPicker = () => {
  const currentLocation = useGetCurrentLocation();
  const { location } = useGetCurrentLocation();
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);
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
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={initialRegion ?? undefined}
          moveOnMarkerPress
          showsUserLocation
          showsCompass
          showsScale
          showsIndoors>
          {/* {items?.map((item) => (
          <Marker
            key={item._id}
            coordinate={{ latitude: item.location?.lat ?? 0, longitude: item.location?.lng ?? 0 }}
            onPress={() => setSelectedItem(item)}
          />
        ))} */}
        </MapView>
      </View>
    </>
  );
};

export default AddressPicker;
