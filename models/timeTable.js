const mongoose = require('mongoose')
const { Schema } = mongoose
const timeTableSchema = Schema({
  title: String,
  content: String,
  startDate: Date,
  endDate: Date,
  room_id: { type: Schema.Types.ObjectId, ref: 'Room' }
})
module.exports = mongoose.model('TimeTable', timeTableSchema)
