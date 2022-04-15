const mongoose = require('mongoose')
const { Schema } = mongoose
const timeTableSchema = Schema({
  checkIn: Date,
  checkOut: Date,
  status: Number,
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  room_id: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Timetable', timeTableSchema)
