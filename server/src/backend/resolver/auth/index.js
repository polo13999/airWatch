const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const config = require('../../config')

const User = require('../models/user')
// const UserBasic = require('../models/userBasic')
// const UserArea = require('../models/userArea')
// const UserClass = require('../models/userClass')
// const UserStatus = require('../models/userStatus')
const { getUserId } = require('../utils')

const Query = {
  Query: {
    user: async (parent, args, ctx) => {
      try {
        const _id = getUserId(ctx)
        const user = await User.findOne({ _id })
        return user
      } catch (error) {
        return
      }
    },

    isUserLoggedIn: async (parent, args, ctx) => {
      try {
        getUserId(ctx)
        return true
      } catch (error) {
        return false
      }
    }
  }
}

const Mutation = {
  Mutation: {
    login: async (_, args, ctx) => {
      const user = await User.findOne({ account: args.account })

      if (!user) {
        throw new Error('無此使用者')
      }

      const valid = await bcrypt.compare(args.password, user.password)
      if (!valid) {
        throw new Error('無效的密碼')
      }

      // console.log('user', user)
      if (!user.isAdmin) {
        if (user.userStatusIndex !== '5ba1eac79120014e90487afb') {
          throw new Error('帳號還沒有啟動歐')
        }
      }

      const token = jwt.sign(
        {
          _id: user._id,
          account: user.account
        },
        config.secret,
        {
          expiresIn: '1d'
        }
      )

      ctx.req.session.userToken = token

      return user
    },

    logout: async (_, args, ctx) => {
      const token = ctx.req.session.userToken
      ctx.req.session.userToken = null

      return {
        token
      }
    }
  }
}

module.exports = { Query, Mutation }
