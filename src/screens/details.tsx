import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';
import React, {useEffect, useState} from 'react';
import {BookInfo} from '../components/bookInfo.tsx';
import {LikeSection} from '../components/booksList.tsx';
import ReadNowButton from '../elements/button.tsx';
import {Book} from '../types/entity.ts';
import SnapCarousel from '../components/snapCarousel.tsx';
import {fetchFromRemoteConfig, findLikedBooks} from '../utils';
import BackButton from '../elements/goBack.tsx';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export const Details = ({route}: DetailsScreenProps) => {
  const [index, setIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<Book[]>([]);
  const [proposedData, setProposedData] = useState<Book[]>([]);

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

        setIndex(selectedIndex);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConfig();
  }, []);
  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <BackButton />
      </SafeAreaView>
      <SnapCarousel setIndex={setIndex} books={carouselData} index={index} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.infoWrapper}>
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
