/**
 * User type is defined in User schema
 */
const typeDefs = `
  type AuthPayload {
    token: String
  }

  type User {
    _id: ID  
    account: String  
    email: String  
    permission:Object
    userCode:String
    password:String
    isAdmin:Boolean
    isSale:Boolean
    active:Boolean       
    updatedAt:String
    createdAt:String
  }
`;

// TODO: maybe we don't need isUserLoggedIn
const queries = `
  isUserLoggedIn: Boolean
  user: User
`;

const mutations = `
  login(account: String!, password: String!): User
  logout: AuthPayload
`;

const authSchema = { typeDefs, queries, mutations };

module.exports = authSchema;
