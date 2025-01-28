import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import background from '../assets/backgrounds/bg.png';
import backgroundHearts from '../assets/backgrounds/bgHear.png';
import * as Progress from 'react-native-progress';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './index.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export const LoadingScreen = ({navigation}: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 1) {
          return 0;
        }
        return prevProgress + 0.34;
      });
    }, 500);

    setTimeout(() => navigation.navigate('Home'), 2000);

    return () => clearInterval(interval);
  }, []);

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

          <Progress.Bar
            progress={0}
            width={300}
            height={10}
            borderWidth={0}
            borderRadius={6}
            color="white"
            unfilledColor="#FFFFFF33"
            animationType="timing"
            animationConfig={{duration: progress === 0 ? 100 : 400, toValue: 1}}
            style={styles.progressBar}
          />
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
  progressBar: {
    marginTop: 50,
  },
});
