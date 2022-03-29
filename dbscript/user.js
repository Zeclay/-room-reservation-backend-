const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const User = require('../models/User')

async function clearUser () {
  await User.deleteMany({})
}

async function main () {
  await clearUser()

  const user = new User({
    name: 'Mankhong',
    surname: 'Limprapaipong',
    username: 'user@mail.com',
    password: 'buu0001',
    position: 'Student',
    institutions: '6242e1253018d3bf3778e520'
  })
  user.save()
}
main().then(function () {
  console.log('Finish')
})
