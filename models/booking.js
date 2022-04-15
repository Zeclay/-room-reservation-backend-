const mongoose = require('mongoose')
const { Schema } = mongoose
const bookingSchema = Schema({
  startTime: Date,
  endTime: Date,
  approveres: [{ type: Schema.Types.ObjectId, ref: 'User', approveDate: Date, status: Number }],
  result_status: Number,
  order: { type: Schema.Types.ObjectId, ref: 'Approve' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  room_id: { type: Schema.Types.ObjectId, ref: 'Room' }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Booking', bookingSchema)
