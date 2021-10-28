const bcrypt = require('bcrypt')
const { Pool } = require('pg')

const db = new Pool({
  database: 'moodtracker'
})

let hashedPassword = ''

function create(name, email, hashedPassword) {
  let sql = 'insert into users (name, email, password) values ($1, $2, $3) returning *;'

  return db.query(sql, [name, email, hashedPassword])
}

function encryptPassword(password) {
  const saltRounds = 10
  
  bcrypt.hash(password, saltRounds)
  .then(encryptedPassword => {
    return hashedPassword = encryptedPassword
  })
  .catch(err => {
    console.log(err)
  })
}

function findById(id) {
  let sql = 'select * from users where id = $1;'

  return db.query(sql, [id])
}

function findByEmail(email) {
  let sql = 'select * from users where email = $1;'

  return db.query(sql, [email])
}

module.exports = {
  create,
  encryptPassword,
  findById,
  findByEmail
}