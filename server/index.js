const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { ApolloServer, gql } = require("apollo-server-express");
const config = require("./config");
const mongoose = require("./mongoose");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "hello world";
        }
      }
    }
  })
});

mongoose.connect(config.mongoURI);

require("./src/models");
require("./config/seed/index");

const port = process.env.PORT || 8080;

const app = express();

app.use(cors({ credentials: true, origin: config.origin }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
    secure: config.production
  })
);
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({
  schema,
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light"
    }
  }
});
server.applyMiddleware({ app });

app.listen(port, err => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`> ready on http://localhost:${port}`);
});
