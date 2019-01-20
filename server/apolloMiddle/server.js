const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('../src/')
//const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
// console.log('typeDefs', typeDefs)
// console.log('resolvers', resolvers)
//const config = require('../config')
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
    console.log('req.session.userToken ', req.session.userToken)
    const userId = await getUserId({ req })

    return { req, userId }
  }
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
