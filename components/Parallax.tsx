import React from 'react';
import {
  ScrollView,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  ScrollViewProps,
  Keyboard,
  KeyboardEvent,
} from 'react-native';

interface ParallaxProps extends ScrollViewProps {
  headerHeight: number;
  children: React.ReactNode;
  renderHeader: () => React.ReactNode;
  scrollViewStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const Parallax: React.FC<ParallaxProps> = ({
  headerHeight,
  children,
  renderHeader,
  scrollViewStyle,
  contentContainerStyle,
  ...scrollViewProps
}) => {
  const scrollY = new Animated.Value(0);
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardShow = (event: KeyboardEvent) => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleKeyboardHide = () => {
    // Optionally, you can scroll back to the top or do nothing
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View style={[{ height: headerHeight }]}>{renderHeader()}</Animated.View>

      <Animated.ScrollView
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
        style={[scrollViewStyle]}
        contentContainerStyle={[{ paddingTop: headerHeight }, contentContainerStyle]}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        {...scrollViewProps}>
        {children}
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};
