import { useQuery } from 'convex/react';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import ItemCard from '~/components/ItemCard';
import { api } from '~/convex/_generated/api';
import { Doc } from '~/convex/_generated/dataModel';
import useGetCurrentLocation from '~/hooks/useGetCurrentLocation';

export default function MapScreen() {
  const items = useQuery(api.items.list, {
    search: '',
  });
  const [selectedItem, setSelectedItem] = useState<Doc<'items'> | null>(null);
  const { location } = useGetCurrentLocation();
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!selectedItem && location) {
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
    if (selectedItem) {
      setInitialRegion({
        latitude: selectedItem.location?.lat ?? 0,
        longitude: selectedItem.location?.lng ?? 0,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      });
      mapRef.current?.animateToRegion(
        {
          latitude: selectedItem.location?.lat ?? 0,
          longitude: selectedItem.location?.lng ?? 0,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
        1000
      );
    }
  }, [location, selectedItem]);

  useEffect(() => {
    if (selectedItem && items) {
      const index = items.findIndex((item) => item._id === selectedItem._id);
      if (index !== -1) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    }
  }, [selectedItem]);

  return (
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
        {items?.map((item) => (
          <Marker
            key={item._id}
            coordinate={{ latitude: item.location?.lat ?? 0, longitude: item.location?.lng ?? 0 }}
            onPress={() => setSelectedItem(item)}
          />
        ))}
      </MapView>

      <View className="absolute bottom-20 left-0 right-0 rounded-t-lg py-2 shadow-md">
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item }) => (
            <View>
              <ItemCard item={item} onPress={() => setSelectedItem(item)} className={'mr-4'} />
            </View>
          )}
          keyExtractor={(item) => item._id}
          horizontal
          pagingEnabled
          contentContainerClassName="px-4"
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
