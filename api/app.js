const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/User')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => console.log('MongoDB db connected')).catch(err => console.log(err))

app.use('/api/users', UserRoutes)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})