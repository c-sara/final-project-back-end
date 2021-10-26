const express = require('express')
const app = express()
const port = 8080

const Mood = require('./models/mood.js')

const { Pool } = require('pg')
const pool = new Pool({
  database: 'moodtracker'
})

app.use(express.json())

app.get('/', (req, res) => {

  res.json({message: 'welcome to the moodtracker api'})

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

  Mood.create(req.body.mood, req.body.habits, req.body.comment, req.body.date)
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
