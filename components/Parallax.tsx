import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Page = ({
  imageUrl,
  onBack,
  onImagePress,
  children,
  Footer,
}: {
  imageUrl?: string;
  onBack?: () => void;
  onImagePress?: (useCamera: boolean) => Promise<void>;
  children: React.ReactNode;
  Footer?: React.ReactNode;
}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {onBack && (
          <TouchableOpacity
            className="absolute left-8 top-16 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white"
            onPress={onBack}>
            <Text>
              <MaterialIcons name="chevron-left" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        )}
        {imageUrl ? (
          <Animated.Image
            source={{
              uri: imageUrl,
            }}
            style={[styles.image, imageAnimatedStyle]}
          />
        ) : (
          <Animated.View style={[styles.placeholder, imageAnimatedStyle]}>
            <TouchableOpacity
              onPress={() => {
                //ask if open camera or library
                Alert.alert('Open Camera or Library?', 'Choose an option', [
                  { text: 'Take a Photo', onPress: () => onImagePress?.(true) },
                  { text: 'Choose from Library', onPress: () => onImagePress?.(false) },
                  { text: 'Cancel', style: 'cancel' },
                ]);
              }}>
              <MaterialIcons name="camera-alt" size={50} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {children}
          {Footer && <View className="flex-1">{Footer}</View>}
        </View>
      </Animated.ScrollView>
    </View>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width,
    height: IMG_HEIGHT,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholder: {
    width,
    height: IMG_HEIGHT,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
