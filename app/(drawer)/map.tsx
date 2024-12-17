import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import Text from '~/components/Text';
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
  const { width } = useWindowDimensions();

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
            <TouchableOpacity
              onPress={() => setSelectedItem(item)}
              style={{ width: width - 32, marginRight: 16 }}>
              <View className={`h-[100px] rounded-lg bg-white p-2`}>
                <View className="flex-1 flex-row gap-4">
                  <Image className="h-full w-[100px] rounded-lg" source={{ uri: item.url }} />
                  <View className="flex-1 justify-between">
                    <View className="w-2/3 flex-1">
                      <Text className="text-lg font-semibold text-accent">{item.name}</Text>
                      <Text ellipsizeMode="tail" numberOfLines={2}>
                        {item.description}
                      </Text>
                    </View>
                    <Text className="text-gray-500">{item.author.name}</Text>
                  </View>
                  <View className="items-center justify-center  pr-4">
                    <TouchableOpacity onPress={() => router.push(`/(drawer)/${item._id}`)}>
                      <View className="rounded-xl bg-accent p-2">
                        <Ionicons name="arrow-forward" size={20} color="white" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
