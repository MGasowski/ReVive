import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

import Text from './Text';

const Status = ({ status }: { status: 'available' | 'reserved' | 'unavailable' }) => {
  return (
    <View
      className={clsx('rounded-lg p-4 ', {
        'bg-green-500': status === 'available',
        'bg-yellow-500': status === 'reserved',
        'bg-red-500': status === 'unavailable',
      })}>
      <Text className="font-semibold text-white">{status}</Text>
    </View>
  );
};

export default Status;
