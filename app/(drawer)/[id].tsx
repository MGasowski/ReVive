import { useQuery } from 'convex/react';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '~/components/Button';
import MapThumbnail from '~/components/MapThumbnail';
import Parallax from '~/components/Parallax';
import Status from '~/components/Status';
import Text from '~/components/Text';
import { api } from '~/convex/_generated/api';
import { Id } from '~/convex/_generated/dataModel';
import Comments from '../../components/Comments';

const ItemDetails = () => {
  const { id } = useLocalSearchParams<{ id: Id<'items'> }>();
  const item = useQuery(api.items.getItem, { id });
  return (
    <Parallax
      imageUrl={item?.url ?? ''}
      onBack={() => router.back()}
      Footer={
        <View className="p-4">
          {!item?.reservable && item?.status === 'available' && (
            <Button title="Want it!" onPress={() => {}} />
          )}
        </View>
      }>
      <View className="absolute -top-8 right-0 flex-1 p-4">
        <Status status={item?.status ?? 'unavailable'} />
      </View>
      <View className="p-4">
        <Text className="text-3xl font-bold text-accent">{item?.name}</Text>
        <Text>{item?.description}</Text>
      </View>
      <View className="flex-1">
        <Text>ss</Text>
      </View>
      <Comments itemId={id} />
    </Parallax>
  );
};

export default ItemDetails;
