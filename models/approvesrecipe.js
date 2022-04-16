const mongoose = require('mongoose')
const { Schema } = mongoose
const approvesRecipeSchema = Schema({
  status_approver: Number,
  current_order: Number,
  booking_id: { type: Schema.Types.ObjectId, ref: 'Booking' },
  approve_id: { type: Schema.Types.ObjectId, ref: 'Approve' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  timeApprove: Date
})
module.exports = mongoose.model('ApproveRecipe', approvesRecipeSchema)
