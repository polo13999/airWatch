const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const GroupClassSchema = new Schema(
  {
    title: String,
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('GroupClass', GroupClassSchema)
