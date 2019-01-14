const { makeExecutableSchema } = require('graphql-tools')
const { AllDef, AllSchema, AllResolvers } = require('./backend')

const typeDefs = []
const queries = []
const mutations = []
AllDef.forEach(s => {
  typeDefs.push(s.typeDefs)
})

AllSchema.forEach(s => {
  queries.push(s.queries)
  mutations.push(s.mutations)
})

//console.log(' ...typeDefs', ...typeDefs)

const RootQuery = `
  type Query { ${[...queries]} }
  type Mutation{ ${[...mutations]} }
`

const SchemaDefinition = `
  schema { query: Query, mutation: Mutation }
`
const result = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, ...typeDefs],
  resolvers: AllResolvers
})

module.exports = result
