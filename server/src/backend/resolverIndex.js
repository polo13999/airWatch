const { merge } = require('lodash')

const OutIndex = merge(require('../backend/user/resolver'))

module.exports = [OutIndex.Query, OutIndex.Mutation]
