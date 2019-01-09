const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const BoardSchema = new Schema(
  {
    memberIndex: { type: Schema.Types.ObjectId, ref: 'member' },
    title: String,
    content: String,
    boardClassIndex: { type: Schema.Types.ObjectId, ref: 'boardClass' },
    isHide: Boolean,
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('Board', BoardSchema)
