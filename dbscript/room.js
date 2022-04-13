const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const Room = require('../models/Room')

async function clearRoom () {
  await Room.deleteMany({})
}

async function main () {
  await clearRoom()
  const Room1 = new Room({
    code: 'KB-203',
    description: 'Projector+Computer',
    floor: 2,
    seat: 80,
    type: 'Meeting',
    approve_id: '62569929231fabe638fda73f',
    building_id: '62568a297f77ab25f2d8a7fb',
    agency_id: '6256867cf6a11a871b32ae24'

  })
  Room1.save()
}
main().then(function () {
  console.log('Finish')
})
