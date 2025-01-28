export type Book = {
  genre: string;
  id: number;
  author: string;
  summary: string;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
  name: string;
  onPress?: () => void;
};

export type GroupedBooks = {
  genre: string;
  data: Book[];
};
