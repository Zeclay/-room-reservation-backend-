const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const Institution = require('../models/Institution')

async function clearInstitution () {
  await Institution.deleteMany({})
}

async function main () {
  await clearInstitution()
  const institutions = new Institution({ name: 'Infomatics' })
  const institutions1 = new Institution({ name: 'Huso' })
  const institutions2 = new Institution({ name: 'Science' })
  const institutions3 = new Institution({ name: 'Engineer' })
  institutions.save()
  institutions1.save()
  institutions2.save()
  institutions3.save()
}
main().then(function () {
  console.log('Finish')
})
