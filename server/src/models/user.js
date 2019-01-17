const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')
/* eslint-disable */
const UserSchema = new Schema(
  {
    userCode: String,
    account: { type: String, unique: true },
    password: String,
    active: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    permission: Object,
    userAreaIndex: String,
    userClassIndex: String,
    userStatusIndex: String,
    userBasicIndex: { type: Schema.Types.ObjectId, ref: 'UserBasic' },
    customerSubClassIndex: {
      type: Schema.Types.ObjectId,
      ref: 'customerSubClass'
    },

    ...fragment
  },
  { timestamps: true }
)

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()
  //console.log('xxxxx')
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro'
  } else {
    const md5 = crypto
      .createHash('md5')
      .update(this.email)
      .digest('hex')
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro'
  }
}

module.exports = mongoose.model('User', UserSchema)
