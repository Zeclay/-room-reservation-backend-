const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = Schema({
  name: String,
  surname: String,
  username: String,
  password: String,
  position: String,
  institutions: { type: Schema.Types.ObjectId, ref: 'Institution' }

})
module.exports = mongoose.model('User', userSchema)
