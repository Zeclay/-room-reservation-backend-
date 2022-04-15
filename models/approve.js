const mongoose = require('mongoose')
const { Schema } = mongoose
const approveSchema = Schema({
  description: String,
  agencys: { type: Schema.Types.ObjectId, ref: 'Agency' },
  order_Approve: { type: [Schema.Types.ObjectId], ref: 'User' }
})
module.exports = mongoose.model('Approve', approveSchema)
