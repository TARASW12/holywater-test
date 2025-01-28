import {StyleSheet, Text, View} from 'react-native';
import {Underline} from '../elements/underline.tsx';
import React from 'react';
import {Book} from '../types/entity.ts';

const keys: (keyof Omit<Book, 'onPress'>)[] = [
  'views',
  'likes',
  'quotes',
  'genre',
];
type Props = {
  carouselData: Book[];
  index: number;
};

export const BookInfo: React.FC<Props> = ({carouselData, index}) => {
  return (
    <>
      {!!carouselData.length && (
        <View>
          <View style={styles.container}>
            {keys.map(item => {
              return (
                <View key={item} style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {carouselData[index][item]}
                  </Text>
                  <Text style={styles.typeText}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </View>
              );
            })}
          </View>
          <Underline />
          <View style={styles.descriptionWrapper}>
            <Text style={styles.summary}>{'Summary'}</Text>
            <Text style={styles.description}>
              {carouselData[index]['summary']}
            </Text>
            <Underline styles={{marginTop: 16}} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  typeText: {
    color: '#D9D5D6',
    fontSize: 12,
    fontWeight: 600,
  },
  infoText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#0B080F',
  },
  descriptionWrapper: {
    marginTop: 16,
  },
  summary: {
    fontSize: 20,
    color: '#0B080F',
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: '#393637',
    fontWeight: '600',
  },
});
