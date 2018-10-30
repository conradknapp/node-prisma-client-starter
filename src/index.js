const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { resolvers } = require("./resolvers");
require('dotenv').config();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on localhost:4000"));
