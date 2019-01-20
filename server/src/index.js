const { AllDef, AllSchema, AllResolvers } = require('./backend')

const queries = []
const mutations = []

AllSchema.forEach(s => {
  queries.push(s.queries)
  mutations.push(s.mutations)
})

const RootQuery = `
  type Query { ${[...queries]} }
  type Mutation{ ${[...mutations]} }
`

// //const SchemaDefinition = `  schema { query: Query, mutation: Mutation }`
// let typeDefs = [RootQuery, ...AllDef]
//console.log('AllDef', AllDef)

const { gql } = require('apollo-server-express')

const typeDefs = gql`
  ${RootQuery}
  ${AllDef}
`
const resolvers = AllResolvers

module.exports = { typeDefs, resolvers }
