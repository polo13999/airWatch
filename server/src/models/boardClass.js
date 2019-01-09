const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const BoardClassSchema = new Schema(
  {
    boardClass: String,
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('BoardClass', BoardClassSchema)
