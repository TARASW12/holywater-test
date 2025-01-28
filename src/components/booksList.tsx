import {View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../screens/main.tsx';
import {Book, GroupedBooks} from '../types/entity.ts';
import FastImage from 'react-native-fast-image';

type Props = {
  text: 'cardTitle' | 'likeCardTitle';
} & Book;

const renderSectionHeader = ({section}: {section: GroupedBooks}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{section.genre}</Text>
  </View>
);

const Card = ({name, text, cover_url, onPress}: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <FastImage source={{uri: cover_url}} style={styles.cardImage} />
      <Text style={styles[text]}>{name}</Text>
    </Pressable>
  );
};

export const SectionContent = ({section}: {section: GroupedBooks}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.sectionWrapper}>
      {renderSectionHeader({section})}
      <FlatList
        data={section.data}
        renderItem={({item}) => (
          <Card
            text={'cardTitle'}
            onPress={() => navigation.navigate('Details', {id: item.id})}
            {...item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export const LikeSection = ({data}: {data: Book[]}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Card
            text={'likeCardTitle'}
            onPress={() => navigation.navigate('Details', item)}
            {...item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 16,
  },
  sectionWrapper: {
    marginBottom: 24,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  card: {
    width: 150,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFFB2',
  },
  likeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#393637',
  },
  flatListContent: {},
  sectionListContent: {
    paddingBottom: 20,
  },
});
