import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import React, {useEffect, useRef, useState} from 'react';
import backArrow from '../assets/backgrounds/backArrow.png';
import remoteConfig from '@react-native-firebase/remote-config';
import MyCarousel from '../components/snapCarousel.tsx';
import {BookInfo} from '../components/bookInfo.tsx';
import {LikeSection} from '../components/booksList.tsx';
import ReadNowButton from '../elements/button.tsx';
import {Book} from '../types/entity.ts';
import FastImage from 'react-native-fast-image';
import SnapCarousel from '../components/snapCarousel.tsx';
import {fetchFromRemoteConfig, findLikedBooks} from '../utils';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export const Details = ({route}: DetailsScreenProps) => {
  const [index, setIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<Book[]>([]);
  const [proposedData, setProposedData] = useState<Book[]>([]);
  const carouselRef = useRef(null);
  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(index);
    }
  };
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const {books: detailsCarousel} = await fetchFromRemoteConfig(
          'details_carousel',
        );
        const {you_will_like_section: likeSection, books} =
          await fetchFromRemoteConfig('json_data');

        setProposedData(findLikedBooks(books, likeSection));
        setCarouselData(detailsCarousel as Book[]);

        const selectedIndex = detailsCarousel.findIndex(
          (i: Book) => i.id === route.params.id,
        );
        if (carouselRef.current) {
          setTimeout(() => goToSlide(selectedIndex), 500);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchConfig();
  }, []);
  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <FastImage style={styles.arrow} source={backArrow} />
      </SafeAreaView>
      <SnapCarousel
        setIndex={setIndex}
        carouselRef={carouselRef}
        books={carouselData}
      />
      <ScrollView style={styles.infoWrapper}>
        <BookInfo carouselData={carouselData} index={index} />
        <Text style={styles.likeText}>You will also like</Text>
        <LikeSection data={proposedData} />
        <ReadNowButton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#532454'},
  arrow: {width: 26, height: 26, marginLeft: 16, marginBottom: 8},
  infoWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  likeText: {
    color: '#0B080F',
    fontWeight: '700',
    marginBottom: 16,
    fontSize: 20,
    marginTop: 16,
  },
});
