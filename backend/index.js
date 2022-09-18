const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// Routes
const userRoutes = require('./routes/userRoutes')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    console.log("production")
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    console.log("DEV")
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080',
            'http://localhost:8080', 'http://127.0.0.1:3000',
            'http://localhost:3000', 'http://127.0.0.1:3030',
            'http://localhost:3030', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use("/api/auth", userRoutes)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection made')
}).catch(err => console.error(err))

const server = app.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT)
})