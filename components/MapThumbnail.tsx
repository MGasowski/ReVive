import React from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

const MapThumbnail = ({
  lat,
  lng,
  className,
  style,
}: {
  lat: number;
  lng: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <MapView
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      className={className}
      style={[styles.mapThumbnail, style]}
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
    height: 70, // Thumbnail height
    borderRadius: 10,
    overflow: 'hidden',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapThumbnail;
