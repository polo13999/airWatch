//const { merge } = require('lodash')

//const resolveHelp = require('../helpTools/resovleHelp')

// const Auth = require('./auth')
// const userPermissionTemplate = require('./otherResolve/userPermissionTemplate')
// const getFileName = require('./otherResolve/getFileName')
// const User = require('./user')
// const Log = require('./user/log')

// const OutIndex = merge(
//   Auth,
//   //User,
//   userPermissionTemplate,
//   // Board,
//   getFileName,
//   User,
//   Log,

// )
let OutIndex = {}
OutIndex.Query = {}
OutIndex.Mutation = {}

const AllResolve = [OutIndex.Query, OutIndex.Mutation]

module.exports = AllResolve
