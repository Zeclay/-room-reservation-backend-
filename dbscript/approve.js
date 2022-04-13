const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const Approve = require('../models/Approve')

async function clearApprove () {
  await Approve.deleteMany({})
}

async function main () {
  await clearApprove()
  const Approve1 = new Approve({ description: 'ชุดผู้พิจารณาที่ 2', order_Approve: ['625697a51bea37ce8b1545f7', '625697a51bea37ce8b1545f8'] })
  Approve1.save()
}
main().then(function () {
  console.log('Finish')
})
