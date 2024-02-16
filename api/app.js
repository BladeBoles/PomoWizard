const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/User')
const TodoRoutes = require('./routes/Todos')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3030

app.use(cors())
app.use(bodyParser.json())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB db connected'))
  .catch((err) => console.log(err))

app.use('/api/users', UserRoutes)
app.use('/api/todos', TodoRoutes)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

