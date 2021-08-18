import { Context, Note, User } from '../common/types';

export default {
  author: async (note: Note, args: any, { models }: Context) => await models.User.findById(note.author),
  favoritedBy: async (note: Note, args: any, { models }: Context) =>
    await models.User.find({ _id: { $in: note.favoritedBy.map((user) => user._id) } }),
};
