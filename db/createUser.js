const bcrypt = require('bcrypt')
const { Pool } = require('pg')

const pool = new Pool({
  database: 'moodtracker'
})

const email = 'mood@mood.com'
const name = 'mood'
const password = 'mood'
const saltRounds = 10

bcrypt.hash(password, saltRounds)
  .then(hashedPassword => {
    const sql = 'insert into users (name, email, password) values ($1, $2, $3);'

    return pool.query(sql, [name, email, hashedPassword])
  })
  .then(res => {
    console.log('new user created successfully')
  })
  .catch(err => {
    console.log(err)
  })