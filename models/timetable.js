const mongoose = require('mongoose')
const { Schema } = mongoose
const timeTableSchema = Schema({
  checkIn: Date,
  checkOut: Date,
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  room_id: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Timetable', timeTableSchema)
