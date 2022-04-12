const mongoose = require('mongoose')
const User = require('../models/User')
const { ROLE } = require('../constant')
mongoose.connect('mongodb://localhost:27017/project')
async function clearUser () {
  await User.deleteMany({})
}

async function main () {
  await clearUser()

  const user = new User({ username: 'user@mail.com', password: 'password', roles: [ROLE.USER] })
  user.save()
  const admin = new User({ username: 'admin@mail.com', password: 'password', roles: [ROLE.ADMIN, ROLE.USER] })
  admin.save()
}

main().then(function main () {
  console.log('Finish')
})
