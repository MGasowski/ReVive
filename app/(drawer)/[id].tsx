import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { useQuery } from 'convex/react';
import MapThumbnail from '~/components/MapThumbnail';
import Parallax from '~/components/Parallax';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';
const ItemDetails = () => {
  const { id } = useLocalSearchParams<{ id: Id<'items'> }>();
  const item = useQuery(api.items.getItem, { id });
  return (
    <Parallax imageUrl={item?.url ?? ''} onBack={() => router.back()}>
      <View>
        <Text className="text-3xl font-bold">{item?.name}</Text>
        <Text>{item?.description}</Text>
        <Text>{item?.author}</Text>
      </View>
      <MapThumbnail lat={item?.location?.lat ?? 0} lng={item?.location?.lng ?? 0} />
    </Parallax>
  );
};

export default ItemDetails;
