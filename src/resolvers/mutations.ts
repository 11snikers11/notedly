import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { Context, User, Note } from '../common/types';
import mongoose from 'mongoose';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET;

export default {
  newNote: async (parent: any, { content }: Note, { models, user }: Context) => {
    if (!user) throw new AuthenticationError('You should be logged in');
    return await models.Note.create({
      content: content,
      author: user._id,
    });
  },

  deleteNote: async (parent: any, { _id }: Note, { models, user }: Context) => {
    try {
      if (!user) throw new AuthenticationError('You should be logged in');
      const note = await models.Note.findById(_id);
      if (!note) throw new Error('Can not find note');
      if (note && String(user._id) !== String(note.author)) throw new ForbiddenError('You do not have permissions');
      await note.remove();
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (parent: any, { _id, content }: Note, { models, user }: Context) => {
    if (!user) throw new AuthenticationError('You should be logged in');
    const note = await models.Note.findById(_id);
    if (!note) throw new Error('Can not find note');
    if (note && String(user._id) !== String(note.author)) throw new ForbiddenError('You do not have permissions');
    return await models.Note.findOneAndUpdate({ _id }, { $set: { content } }, { new: true });
  },

  signUp: async (parent: any, { username, email, password }: User, { models }: Context) => {
    email = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashedPassword,
      });
      if (!jwtSecret) throw new Error('no jwt secret');
      return jwt.sign({ _id: user._id }, jwtSecret);
    } catch (error) {
      console.log('[Mongo]', 'User creation error:', error);
    }
  },

  signIn: async (parent: any, { username, email, password }: User, { models }: Context) => {
    email = email.trim().toLowerCase();
    const user = await models.User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new AuthenticationError('Sign in error');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new AuthenticationError('Wrong password');
    if (!jwtSecret) throw new Error('no jwt secret');
    return jwt.sign({ _id: user._id }, jwtSecret);
  },

  toggleFavorite: async (parent: any, { _id }: Note, { models, user }: Context) => {
    if (!user) throw new AuthenticationError('You should be logged in');
    const noteToToggle = await models.Note.findById(_id);
    if (!noteToToggle) throw new Error('There is no note with such ID');
    // Здесь так и будет эта ошибка, ничего с ней не поделать
    let isCheckedByUser = (noteToToggle.favoritedBy as any).includes(user._id);
    if (isCheckedByUser) {
      return await models.Note.findByIdAndUpdate(_id, {
        $pull: { favoritedBy: user._id },
        $inc: { favoriteCount: -1 },
      });
    } else {
      return await models.Note.findByIdAndUpdate(
        _id,
        {
          $push: { favoritedBy: user._id },
          $inc: { favoriteCount: 1 },
        },
        { new: true }
      );
    }
  },
};
