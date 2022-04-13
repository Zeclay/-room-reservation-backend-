const mongoose = require('mongoose')
const User = require('../models/User')
const { ROLE } = require('../constant.js')
mongoose.connect('mongodb://localhost:27017/project')
async function clearUser () {
  await User.deleteMany({})
}

async function main () {
  await clearUser()
  const user = new User({
    name: 'Mankhong',
    surname: 'Limprapaipaong',
    username: '62160143',
    password: 'buu0001',
    position: 'Student',
    roles: [ROLE.USER]
  })

  const user1 = new User({
    name: 'Christmas',
    surname: 'Chukesorn',
    username: 'christmas',
    password: 'buu0004',
    position: 'Teacher',
    roles: [ROLE.USER, ROLE.APPROVER]
  })

  const user2 = new User({
    name: 'Sawaminee',
    surname: 'Theerawut',
    username: 'Sawaminee',
    password: 'buu0009',
    position: 'Teacher',
    roles: [ROLE.USER, ROLE.APPROVER]
  })

  const user3 = new User({
    name: 'Supakit',
    surname: 'Kongkam',
    username: 'Supakit',
    password: 'buu0015',
    position: 'Teacher',
    roles: [ROLE.USER, ROLE.LOCAL_ADMIN]
  })

  const user4 = new User({
    name: 'Pubodin',
    surname: 'Sukjaroen',
    username: 'Pubodin',
    password: 'buu0016',
    position: 'Teacher',
    roles: [ROLE.USER, ROLE.SYSTEM]
  })
  user.save()
  user1.save()
  user2.save()
  user3.save()
  user4.save()
}

main().then(function main () {
  console.log('Finish')
})
