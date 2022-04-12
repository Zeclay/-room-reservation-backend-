const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const bookingSchema = Schema({
    startTime: Date,
    endTime: Date,
    approveres: [String],
    status: int,
    approve_id : [{type: Schema.Types.ObjectId , ref: 'Approve'}],
    user_id: {type:Schema.Types.ObjectId, ref: 'User'},
    room_id: {type:Schema.Types.ObjectId, ref: 'Room'}
})
module.exports = mongoose.model('Booking', bookingSchema)
