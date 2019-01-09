const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const EventSchema = new Schema(
  {
    eventTitle: String,
    content: String,
    eventClassIndex: { type: Schema.Types.ObjectId, ref: 'eventClass' },
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', EventSchema)
