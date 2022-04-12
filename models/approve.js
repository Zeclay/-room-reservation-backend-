const mongoose = require('mongoose')
const { Schema } = mongoose
const approveSchema = Schema({
  description: String,
  order_Approve: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  institution_id: { type: Schema.Types.ObjectId, ref: 'Institution' }
})
module.exports = mongoose.model('Approve', approveSchema)
