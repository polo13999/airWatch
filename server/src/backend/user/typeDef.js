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
    active:Boolean       
    updatedAt:String
    createdAt:String
  }
`

module.exports = typeDefs
