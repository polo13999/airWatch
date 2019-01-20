const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../src/')
//const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
// console.log('typeDefs', typeDefs)
// console.log('resolvers', resolvers)
const config = require('../config')
const { getUserId } = require('../src/utils')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'light'
    }
  },
  context: async ({ req }) => {
    const userId = await getUserId({ req })
    //console.log('userId gogo', userId)
    return { req, userId }
  },
  engine: false,
  tracing: true,
  debug: !process.env.PRODUCTION,
  introspection: !process.env.PRODUCTION,
  cors: { origin: config.origin } //用express的
})

module.exports = server

// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'hello world'
//         }
//       }
//     }
//   })
// })
