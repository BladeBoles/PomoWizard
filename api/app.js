const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/User')
const TodoRoutes = require('./routes/Todos')

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3030

const allowedOrigins = [
  'http://localhost:5173',
  'https://pomowizard.netlify.app'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

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
