const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const GroupSchema = new Schema(
  {
    title: String,
    response: String,
    tel: String,
    address: String,
    GroupClassIndex: { type: Schema.Types.ObjectId, ref: 'GroupClass' },
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('Group', GroupSchema)
