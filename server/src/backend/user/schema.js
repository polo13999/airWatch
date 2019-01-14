const queries = `
  isUserLoggedIn: Boolean
  user: User
`

const mutations = `
  login(account: String!, password: String!): User
  logout: AuthPayload
`

const authSchema = { queries, mutations }

module.exports = authSchema
