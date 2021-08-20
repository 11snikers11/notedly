import { InMemoryCache, makeVar } from '@apollo/client';
import { INote } from '../@types';

export const isLoggedIn = makeVar<boolean>(!!localStorage.getItem('token'));

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        noteFeed: {
          keyArgs: false,
          merge(existing, incoming) {
            debugger;
            let notes: Array<INote> = [];
            if (existing && existing.notes) notes = notes.concat(existing.notes);
            if (incoming && incoming.notes) notes = notes.concat(incoming.notes);
            return {
              ...incoming,
              notes,
            };
          },
        },
      },
    },
  },
});
