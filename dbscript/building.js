const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/project')
const Building = require('../models/Building')

async function clearBuilding () {
  await Building.deleteMany({})
}

async function main () {
  await clearBuilding()
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
}
main().then(function () {
  console.log('Finish')
})
