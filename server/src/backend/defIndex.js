let typeDefs = []

typeDefs.push('scalar Date')
typeDefs.push('scalar Object')
typeDefs.push(require('./extraType'))
typeDefs.push(require('./user/typeDef'))
//console.log('typeDefs', typeDefs)
module.exports = typeDefs
