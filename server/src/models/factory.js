const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const FactorySchema = new Schema(
  {
    title: String,
    response: String,
    tel: String,
    address: String,
    FactoryClassIndex: { type: Schema.Types.ObjectId, ref: 'FactoryClass' },
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('Factory', FactorySchema)
