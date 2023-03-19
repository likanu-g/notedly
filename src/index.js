const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });
app.get('/', (req, rep) => rep.send('Hello Web Server'));
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
