const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
const userSchema = Schema({
  name: String,
  surname: String,
  position: String,
  institution: String,
  username: String,
  password: String,
  rank_id: [{ type: Schema.Types.ObjectId, ref: 'Rank' }]
})
userSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

module.exports = mongoose.model('User', userSchema)
