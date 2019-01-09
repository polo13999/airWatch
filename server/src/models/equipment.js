const mongoose = require('mongoose')
const { Schema } = mongoose
const fragment = require('./fragment/mutationWork')

const EquipmentSchema = new Schema(
  {
    equipmentTitle: String,
    content: String,
    equipmentClassIndex: { type: Schema.Types.ObjectId, ref: 'equipmentClass' },
    ...fragment
  },
  { timestamps: true }
)

module.exports = mongoose.model('equipment', EquipmentSchema)
