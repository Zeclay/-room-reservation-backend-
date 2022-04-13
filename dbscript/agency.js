const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const Agency = require('../models/Agency')

async function clearAgency () {
  await Agency.deleteMany({})
}

async function main () {
  await clearAgency()
  const Agencys = new Agency({ name: 'Infomatics' })
  const Agency1 = new Agency({ name: 'Huso' })
  const Agency2 = new Agency({ name: 'Science' })
  const Agency3 = new Agency({ name: 'Engineer' })
  Agencys.save()
  Agency1.save()
  Agency2.save()
  Agency3.save()
}
main().then(function () {
  console.log('Finish')
})
