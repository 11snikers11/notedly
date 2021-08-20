export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface INoteFeed {
  cursor: string;
  hasNextPage: boolean;
  notes: Array<INote>;
}

export interface INote {
  id: string;
  content: string;
  author: User;
  createdAt: date;
  favoriteCount: number;
  favoritedBy: Array<IUser>;
}
