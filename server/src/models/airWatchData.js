const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const WatchDataSchema = new Schema(
  {
    watchDateTime: Date,
    watchData: Object,
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('WatchData', WatchDataSchema)
