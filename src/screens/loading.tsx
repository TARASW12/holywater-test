import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import background from '../assets/backgrounds/bg.png';
import backgroundHearts from '../assets/backgrounds/bgHear.png';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './index.tsx';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export const LoadingScreen = ({navigation}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(
      1,
      {
        duration: 2000,
        easing: Easing.linear,
      },
      finished => {
        if (finished) {
          runOnJS(navigation.navigate)({ name: 'Home', params:undefined });
        }
      },
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  return (
    <ImageBackground
      resizeMode="cover"
      source={background}
      style={styles.backgroundContainer}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundHearts}
        style={styles.backgroundHearts}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Book App</Text>
          <Text style={styles.subtitle}>Welcome to Book App</Text>

          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, animatedStyle]} />
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  backgroundHearts: {
    flex: 1,
  },

  progressBarBackground: {
    width: 300,
    height: 10,
    marginTop: 20,
    backgroundColor: '#FFFFFF33',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontStyle: 'italic',
    color: '#DD48A1',
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
