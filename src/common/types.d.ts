import { Schema } from 'mongoose';
import Models from '../model';

export interface User {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface NoteFeed {
  cursor: string;
  hasNextPage: boolean;
  notes: Array<Note>;
}

export interface Note {
  _id: Schema.Types.ObjectId;
  content: string;
  author: User;
  favoriteCount: number;
  favoritedBy: Array<User>;
}

export interface Context {
  models: {
    Note: typeof Models.Note;
    User: typeof Models.User;
  };
  user: User;
}
