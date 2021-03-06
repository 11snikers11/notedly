/// <reference path="./common/graphql-validation-complexity.d.ts"/>

require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import jwt from 'jsonwebtoken';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import resolvers from './resolvers';
import { connectToDb } from './db';
import typeDefs from './schema';
import models from './model';

const app = express();
const port = process.env.PORT || 4000;

// app.use(helmet());
// app.use(cors());
app.listen(port, () => console.log('[Server]', `Server started at http://localhost:4000`));

connectToDb();
startApollo();

function getUser(token: string) {
  if (token) {
    try {
      if (!process.env.JWT_SECRET) throw new Error('jwt secret required');
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export async function startApollo() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUser(token);
        console.log('[Auth]', 'User data:', user);
        return { models, user };
      },
    });
    console.log('[Apollo]', 'Statring server...');
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    console.log('[Apollo]', 'Started at http://localhost:4000/api');
  } catch (error) {
    console.log('[Apollo]', 'Error:', error);
  }
}
