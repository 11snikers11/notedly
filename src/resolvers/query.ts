import { Context, User, Note, NoteFeed } from '../common/types';

export default {
  notes: async (parent: any, args: any, { models }: Context) => await models.Note.find().limit(100),
  note: async (parent: any, { _id }: Note, { models }: Context) => await models.Note.findById(_id),
  user: async (parent: any, { username }: User, { models }: Context) => await models.User.findOne({ username }),
  users: async (parent: any, args: any, { models }: Context) => await models.User.find(),
  me: async (parent: any, args: any, { models, user }: Context) => await models.User.findById(user._id),
  noteFeed: async (parent: any, { cursor }: NoteFeed, { models }: Context) => {
    const queryLimit = 10;
    let hasNextPage = false;
    let cursorQuery = {};
    if (cursor) cursorQuery = { _id: { $lt: cursor } };
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(queryLimit + 1);
    if (notes.length > queryLimit) {
      notes = notes.slice(0, -1);
      hasNextPage = true;
    }
    const newCursor = notes[notes.length - 1]._id;
    return {
      notes,
      cursor: newCursor,
      hasNextPage,
    };
  },
};
