import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';
import React, {useEffect, useState} from 'react';
import {CustomCarousel} from '../components/carousel.tsx';
import {fetchFromRemoteConfig, groupByGenre} from '../utils';
import {SectionContent} from '../components/booksList.tsx';
import {RootStackParamList} from './index.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GroupedBooks} from '../types/entity.ts';

export type Slide = {
  cover: string;
  id: number;
  book_id: number;
};
export type SlideData = Slide[];

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export const MainScreen = () => {
  const [data, setData] = useState<SlideData>([]);
  const [sections, setSections] = useState<GroupedBooks[] | []>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const {top_banner_slides, books} = await fetchFromRemoteConfig(
          'json_data',
        );
        setData(top_banner_slides as SlideData);
        setSections(groupByGenre(books));
      } catch (error) {
        console.log(error);
      }
    };

    fetchConfig();
  }, []);
  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.headerText}>Library</Text>
        <CustomCarousel data={data} />
        <ScrollView style={styles.scrollWrapper}>
          {sections.map(s => {
            return <SectionContent key={s.genre} section={s} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    flex: 1,
  },
  safeWrapper: {
    flex: 1,
  },
  headerText: {
    color: 'red',
    marginTop: 38,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '700',
  },
  scrollWrapper: {
    marginTop: 40,
    marginHorizontal: 16,
  },
});
