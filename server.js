var express = require('express')
var cors = require('cors')
const path = require('path')
require('dotenv').config()
const multer = require('multer')
const upload = multer({ dest: './public/data/uploads' })

var app = express()

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render(path.join(__dirname + '/views/index.ejs'))
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileInfo = req.file

  res.json({
    name: fileInfo.originalname,
    type: fileInfo.mimetype,
    size: fileInfo.size,
  })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})

module.exports = app