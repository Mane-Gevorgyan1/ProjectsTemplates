const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/router')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser('secretcode'))

app.use(session({
    secret: 'aksfxxxdgfjskfkjhb5',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 99999999999999 }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,      //access-control-allow-credentials:true
}));

app.use('/', router)

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))