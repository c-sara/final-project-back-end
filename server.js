const express = require('express')
const app = express()
const port = 8080

const bcrypt = require('bcrypt')
var session = require('express-session')

const Mood = require('./models/mood.js')
const User = require('./models/user.js')

const { Pool } = require('pg')
const pool = new Pool({
  database: 'moodtracker'
})

app.use(express.json())

app.use(session({ 
  secret: 'keyboard cat', 
  cookie: { maxAge: 60000 }
}))

app.get('/', (req, res, next) => {


  if(req.session.userId) {
    console.log(req.session.userId)

    res.send('welcome ' + req.session.name)

    res.end()
  } else {
    res.send('please login to your account')
  }

})

app.get('/login', (req, res) => {
  if (!req.query.email || !req.query.password) {

    res.send('login failed')

  } else if (req.query.email === 'mood@mood.com' && req.query.password === 'mood') {

    req.session.userId = User.findByEmail(req.query.email)[id]

    // req.session.name = User.findByEmail(req.query.email)[name]

    res.send('login successful')
  }
})

app.post('/sign-up', (req, res) => {
  console.log(req.body)

  const name = req.body.userName
  const email = req.body.userEmail
  const password = req.body.userPassword
  const saltRounds = 10

  bcrypt.hash(password, saltRounds)
  .then(hashedPassword => {
    
    return User.create(name, email, hashedPassword)
  })
  .then(res => {
    console.log('new user added')
  })
  .catch(err => {
    console.log(err)
  })

  //salt password
  // const hashedPassword = User.encryptPassword(req.body.password)

  // User.create(req.body.name, req.body.email, hashedPassword)
  //   .then(dbRes => {
  //     res.status(201).json({ message: 'new user added', item: dbRes.rows[0] })
  //     })
  //     .catch(err => {
  //     res.status(500).json({ message: 'something went wrong. try again' })
  //     })

})

app.get('/api/moods', (req, res) => {
  
  Mood.all()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
    .catch(err => {
      res.json(err)
    })

})

app.get('/api/moods/:date', (req, res) => {

  Mood.single(req.params.date)
    .then(dbRes => {
      res.json(dbRes.rows[0])
    })
    .catch(err => {
      res.json(err)
    })

})

app.post('/api/moods', (req, res) => {

  console.log(req.body)
  Mood.create(req.body.mood, req.body.habits, req.body.note, req.body.date)
        .then(dbRes => {
        res.status(201).json({ message: 'new mood added', item: dbRes.rows[0] })
        })
        .catch(err => {
        res.status(500).json({ message: 'something went wrong. try again' })
    })

})


app.listen(port, () => {
  console.log(`server listening on port ${port}.`)
})
