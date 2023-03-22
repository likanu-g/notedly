const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

//导入项目模块
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
//连接数据库
db.connect(DB_HOST);

//设置Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    //添加数据库模型到上下文
    return { models };
  }
});

//应用Apollo GraphQL中间件，把路径设置为/api
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, rep) => rep.send('Hello Web Server'));
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
);
