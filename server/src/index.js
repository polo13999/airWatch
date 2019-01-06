const { makeExecutableSchema } = require("graphql-tools");

const AllDef = require("./schema");
const AllResolvers = require("./resolver");

const typeDefs = [];
const queries = [];
const mutations = [];

typeDefs.push("scalar Date");
typeDefs.push("scalar Object");

AllDef.forEach(s => {
  typeDefs.push(s.typeDefs);
  queries.push(s.queries);
  mutations.push(s.mutations);
});
//console.log(' ...typeDefs', ...typeDefs)

const RootQuery = `
  type Query { ${[...queries]} }
  type Mutation{ ${[...mutations]} }
`;

const SchemaDefinition = `
  schema { query: Query, mutation: Mutation }
`;
const result = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...typeDefs],
  resolvers: AllResolvers
});

module.exports = result;
