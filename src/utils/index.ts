import {Book, GroupedBooks} from '../types/entity.ts';
import remoteConfig from '@react-native-firebase/remote-config';

export const groupByGenre = (books: Book[]): GroupedBooks[] => {
  return books.reduce((acc: GroupedBooks[], book: Book) => {
    const genreGroup = acc.find(group => group.genre === book.genre);

    if (genreGroup) {
      genreGroup.data.push(book);
    } else {
      acc.push({genre: book.genre, data: [book]});
    }

    return acc;
  }, [] as GroupedBooks[]);
};

export const fetchFromRemoteConfig = async (key: string) => {
  try {
    await remoteConfig().fetchAndActivate();
    const data = remoteConfig().getValue(key).asString();
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const findLikedBooks = (books: Book[], ids: number[]): Book[] => {
  return ids.reduce((acc: Book[], cur: number) => {
    const foundBook = books.find((b: Book) => b.id === cur);
    if (foundBook) {
      acc.push(foundBook);
    }
    return acc;
  }, []);
};
