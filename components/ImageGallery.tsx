import { View, Text, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <Swiper showsButtons={true}>
      <View>
        {images.map((image) => (
          <Image source={{ uri: image }} className="h-full w-full" />
        ))}
      </View>
    </Swiper>
  );
};

export default ImageGallery;
