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
`
module.exports = typeDefs
