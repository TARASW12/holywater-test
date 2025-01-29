import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Book} from '../types/entity.ts';
import FastImage from 'react-native-fast-image';

const {width: screenWidth} = Dimensions.get('window');

interface CarouselComponentProps {
  books: Book[];
  setIndex: (index: number) => void;
  index: number;
}

const renderItem = ({item}: {item: Book}) => (
  <View style={styles.slide}>
    <FastImage source={{uri: item.cover_url}} style={styles.image} />
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.author}>{item.author}</Text>
  </View>
);

const SnapCarousel: React.FC<CarouselComponentProps> = ({
  books,
  setIndex,
  index,
}) => {
  return (
    <View style={{marginBottom: 20}}>
      <Carousel
        data={books}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        layout="default"
        loop={false}
        getItemLayout={() => ({
          length: screenWidth / 2,
          offset: (screenWidth / 2) * index,
          index,
        })}
        initialScrollIndex={index}
        loopClonesPerSide={books.length}
        initialNumToRender={books.length}
        autoplay={false}
        firstItem={index}
        contentContainerCustomStyle={{
          minWidth: screenWidth * books.length,
        }}
        keyExtractor={item => item.name}
        onSnapToItem={index => setIndex(index)}
        enableSnap={true}
        inactiveSlideScale={0.75}
        itemWidth={screenWidth * 0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    color: 'white',
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '700',
    color: '#FFFFFFCC',
    textAlign: 'center',
  },
});

export default SnapCarousel;
