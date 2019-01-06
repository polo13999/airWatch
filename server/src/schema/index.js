const typeDefs = ` 
type Total{ 
  totalCount:Int
}
type UpdateUser{
  successs:Boolean
}
type SaleUser{
  productCode:String
  execUserIndex:String
}
type SaleMoneyQ{
  _id:SaleUser  
  sumPrice:Float
}
`;
const result = [
  { typeDefs },
  require("./auth")
  // require('./user/user'),
];

module.exports = result;
