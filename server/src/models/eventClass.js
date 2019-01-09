const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const eventClassSchema = new Schema(
  {
    eventClassTitle: String,
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('eventClass', eventClassSchema)
