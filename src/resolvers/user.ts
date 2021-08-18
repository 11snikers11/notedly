import { Context, User } from '../common/types';

export default {
  notes: async (user: User, args: any, { models }: Context) => await models.Note.find({ author: user }),
  favorites: async (user: User, args: any, { models }: Context) => await models.Note.find({ favoritedBy: user }),
};
