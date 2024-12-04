import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapThumbnail = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <MapView
      style={styles.mapThumbnail}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      scrollEnabled={false}
      zoomEnabled={false}>
      <Marker
        coordinate={{
          latitude: lat,
          longitude: lng,
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapThumbnail: {
    width: 'auto', // Adjust width as needed
    height: 150, // Thumbnail height
    borderRadius: 10,
    overflow: 'hidden',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapThumbnail;
