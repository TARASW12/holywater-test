import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import React, {useCallback, useRef, useState} from 'react';
import {HomeScreenNavigationProp, SlideData} from '../screens/main.tsx';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;

export const CustomCarousel = ({data}: {data: SlideData}) => {
  const prevProgress = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onProgressChange = useCallback(
    (offset: number, absoluteProgress: number) => {
      const progressDiff = Math.abs(absoluteProgress - prevProgress.current);
      if (progressDiff > 0.2) {
        prevProgress.current = absoluteProgress;
        const value =
          Math.round(absoluteProgress) >= data.length
            ? 0
            : Math.round(absoluteProgress);
        setCurrentIndex(value);
      }
    },
    [data.length],
  );
  return (
    <View style={styles.carouselWrapper}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        onProgressChange={onProgressChange}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('Details', {id: item.book_id})}>
            <ImageBackground
              resizeMode={'cover'}
              imageStyle={{borderRadius: 8}}
              style={styles.imageWrapper}
              source={{uri: item.cover}}>
              <View style={styles.indicatorContainer}>
                {data.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.indicator,
                      {
                        backgroundColor:
                          currentIndex === idx ? '#D0006E' : '#C1C2CA',
                      },
                    ]}
                  />
                ))}
              </View>
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    marginTop: 25,
    paddingTop: 0,
    position: 'relative',
    height: 160,
    marginHorizontal: 16,
  },
  imageWrapper: {
    width: width - 32,
    aspectRatio: 343 / 160,
    borderRadius: 12,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 5,
    margin: 5,
  },
});
