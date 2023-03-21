const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
require('dotenv').config();
const db = require('./db');
const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const models = require('./models');

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note', author: 'Riley Harrison' }
];

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!, author: String): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};
const app = express();
//连接数据库
db.connect(DB_HOST);
//设置Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
//应用Apollo GraphQL中间件，把路径设置为/api
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, rep) => rep.send('Hello Web Server'));
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
);
