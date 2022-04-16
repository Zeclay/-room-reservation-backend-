const mongoose = require('mongoose')

const User = require('../models/User')
const Room = require('../models/Room')
const Building = require('../models/Building')
const Approve = require('../models/Approve')
const Agency = require('../models/Agency')

const { ROLE } = require('../constant.js')
mongoose.connect('mongodb://localhost:27017/project')

async function clear () {
  await User.deleteMany({})
  await Room.deleteMany({})
  await Building.deleteMany({})
  await Approve.deleteMany({})
  await Agency.deleteMany({})
}

async function main () {
  await clear()
  const Agency1 = new Agency({ name: 'Infomatics' })
  const Agency2 = new Agency({ name: 'Huso' })
  const Agency3 = new Agency({ name: 'Science' })
  const Agency4 = new Agency({ name: 'Engineer' })
  Agency1.save()
  Agency2.save()
  Agency3.save()
  Agency4.save()

  const user = new User({
    name: 'Mankhong',
    surname: 'Limprapaipaong',
    username: '62160143',
    password: 'buu0001',
    agency: Agency1,
    position: 'Student',
    email: '62160143@gmail.com',
    roles: [ROLE.USER]
  })

  const user1 = new User({
    name: 'Christmas',
    surname: 'Chukesorn',
    username: 'christmas',
    password: 'buu0004',
    agency: Agency2,
    position: 'Teacher',
    email: 'christmas@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })

  const user2 = new User({
    name: 'Sawaminee',
    surname: 'Theerawut',
    username: 'Sawaminee',
    password: 'buu0009',
    agency: Agency2,
    position: 'Teacher',
    email: 'Sawaminee@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })

  const user3 = new User({
    name: 'Supakit',
    surname: 'Kongkam',
    username: 'Supakit',
    password: 'buu0015',
    agency: Agency1,
    position: 'Teacher',
    email: 'Supakit@gmail.com',
    roles: [ROLE.USER, ROLE.LOCAL_ADMIN]
  })

  const user4 = new User({
    name: 'Pubodin',
    surname: 'Sukjaroen',
    username: 'Pubodin',
    password: 'buu0016',
    agency: Agency1,
    position: 'Teacher',
    email: 'Pubodin@gmail.com',
    roles: [ROLE.USER, ROLE.SYSTEM]
  })
  user.save()
  user1.save()
  user2.save()
  user3.save()
  user4.save()

  const Approve1 = new Approve({ description: 'ชุดผู้พิจารณาที่ 2', agencys: Agency2, approver1: user1, approver2: user2, order: 2 })
  Approve1.save()

  const Building1 = new Building({ name_build: 'อาคารคณะวิทยาการสารสนเทศ', code: 'IF' })
  const Building2 = new Building({ name_build: 'อาคารเฉลิมพระเกียรติฉลองสิริราชสมบัติครบ 60 ปี', code: 'KB' })
  const Building3 = new Building({ name_build: 'อาคารเคมี', code: 'C' })
  const Building4 = new Building({ name_build: 'อาคารวิศวกรรมภาคโยธา', code: 'CE' })
  const Building5 = new Building({ name_build: 'อาคารคณะวิทยาศาสตร์การกีฬา', code: 'FSS' })
  const Building6 = new Building({ name_build: 'อาคารคณิตศาสตร์', code: 'MA' })
  Building1.save()
  Building2.save()
  Building3.save()
  Building4.save()
  Building5.save()
  Building6.save()

  const Room1 = new Room({
    code: 'KB-203',
    description: 'Projector+Computer',
    floor: 2,
    seat: 80,
    type: 'Meeting',
    approve_id: Approve1,
    building_id: Building2,
    agency_id: Agency2

  })
  Room1.save()
}

main().then(function main () {
  console.log('Finish')
})
