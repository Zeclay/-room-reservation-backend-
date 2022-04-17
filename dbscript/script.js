const mongoose = require('mongoose')

const User = require('../models/User')
const Room = require('../models/Room')
const Building = require('../models/Building')
const Approve = require('../models/Approve')
const Agency = require('../models/Agency')
const Booking = require('../models/Booking')
const Approverecipe = require('../models/approvesrecipe')
const TimeTable = require('../models/timetable')
const { ROLE } = require('../constant.js')
mongoose.connect('mongodb://localhost:27017/project')

async function clear () {
  await User.deleteMany({})
  await Room.deleteMany({})
  await Building.deleteMany({})
  await Approve.deleteMany({})
  await Agency.deleteMany({})
  await Booking.deleteMany({})
  await Approverecipe.deleteMany({})
  await TimeTable.deleteMany({})
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
  const user5 = new User({
    name: 'Worrawit',
    surname: 'Weerapan',
    username: 'worrawit',
    password: 'buu0006',
    agency: Agency1,
    position: 'Teacher',
    email: 'worrawit@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user6 = new User({
    name: 'Jakkarin',
    surname: 'Suksawatchon',
    username: 'jakkarin',
    password: 'buu0007',
    agency: Agency1,
    position: 'Teacher',
    email: 'jakkarin@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user7 = new User({
    name: 'Nongnuch',
    surname: 'Yenjai',
    username: 'Nongnuch',
    password: 'buu0010',
    agency: Agency3,
    position: 'Teacher',
    email: 'Nongnuch@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user8 = new User({
    name: 'Somying',
    surname: 'Jaidee',
    username: 'Somying',
    password: 'buu0013',
    agency: Agency4,
    position: 'Teacher',
    email: 'somying@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user9 = new User({
    name: 'SomJai',
    surname: 'Thaiderm',
    username: 'Somjai',
    password: 'buu0014',
    agency: Agency4,
    position: 'Teacher',
    email: 'somjai@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user10 = new User({
    name: 'Nathalinee',
    surname: 'Sinaroj',
    username: 'nathalinee',
    password: 'buu0005',
    agency: Agency2,
    position: 'Teacher',
    email: 'nathalinee@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user11 = new User({
    name: 'Peerapat',
    surname: 'Yendee',
    username: 'Peerapat',
    password: 'buu0011',
    agency: Agency4,
    position: 'Teacher',
    email: 'Peerapat@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  const user12 = new User({
    name: 'Somchai',
    surname: 'Sombut',
    username: 'somchai',
    password: 'buu0012',
    agency: Agency4,
    position: 'Teacher',
    email: 'Somchai@gmail.com',
    roles: [ROLE.USER, ROLE.APPROVER]
  })
  user.save()
  user1.save()
  user2.save()
  user3.save()
  user4.save()
  user5.save()
  user6.save()
  user7.save()
  user8.save()
  user9.save()
  user10.save()
  user11.save()
  user12.save()

  const Approve1 = new Approve({ description: 'ชุดผู้พิจารณาที่ 1', agencys: Agency1, approver1: user5, approver2: user6, order: 2 })
  const Approve2 = new Approve({ description: 'ชุดผู้พิจารณาที่ 2', agencys: Agency2, approver1: user1, approver2: user10, order: 2 })
  const Approve3 = new Approve({ description: 'ชุดผู้พิจารณาที่ 3', agencys: Agency3, approver1: user2, approver2: user7, order: 2 })
  const Approve4 = new Approve({ description: 'ชุดผู้พิจารณาที่ 4', agencys: Agency4, approver1: user11, approver2: user12, order: 2 })
  Approve1.save()
  Approve2.save()
  Approve3.save()
  Approve4.save()

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
    approve_id: Approve2,
    building_id: Building2,
    agency_id: Agency2

  })
  const Room2 = new Room({
    code: 'IF-3C01',
    description: 'TV+Projector+Computer',
    floor: 3,
    seat: 50,
    type: 'Lab',
    approve_id: Approve1,
    building_id: Building1,
    agency_id: Agency1

  })

  const Room3 = new Room({
    code: 'C-310',
    description: 'TV+Projector',
    floor: 3,
    seat: 50,
    type: 'Lecture',
    approve_id: Approve3,
    building_id: Building3,
    agency_id: Agency3

  })

  const Room4 = new Room({
    code: 'FSS501',
    description: 'TV+Projector',
    floor: 5,
    seat: 50,
    type: 'Lab',
    approve_id: Approve4,
    building_id: Building5,
    agency_id: Agency4

  })
  const Room5 = new Room({
    code: 'CE-102',
    description: 'TV+Projector',
    floor: 1,
    seat: 50,
    type: 'Lecture',
    approve_id: Approve3,
    building_id: Building4,
    agency_id: Agency3

  })
  const Room6 = new Room({
    code: 'MA-104',
    description: 'TV+Projector+WriteBroad',
    floor: 1,
    seat: 50,
    type: 'Lecture',
    approve_id: Approve3,
    building_id: Building6,
    agency_id: Agency3

  })
  const Room7 = new Room({
    code: 'IF-3C03',
    description: 'TV+Projector+Computer',
    floor: 3,
    seat: 50,
    type: 'Lab',
    approve_id: Approve1,
    building_id: Building1,
    agency_id: Agency1

  })

  const Room8 = new Room({
    code: 'IF-7T01',
    description: 'TV+Projector+Computer',
    floor: 7,
    seat: 60,
    type: 'Lab',
    approve_id: Approve1,
    building_id: Building1,
    agency_id: Agency1

  })

  Room1.save()
  Room2.save()
  Room3.save()
  Room4.save()
  Room5.save()
  Room6.save()
  Room7.save()
  Room8.save()
}

main().then(function main () {
  console.log('Finish')
})
