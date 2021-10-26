const bcrypt = require('bcrypt')
const { Pool } = require('pg')

const db = new Pool({
  database: 'moodtracker'
})

let hashedPassword = ''

function create(name, email, hashedPassword) {
  let sql = 'insert into users (name, email, password) values ($1, $2, $3);'

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

//RUBY VERSION BELOW
// def find_user_by_id(id)

//     sql = "SELECT * FROM users WHERE id = $1;"

//     result = run_sql(sql, [id])

//     if result.count > 0
//         return result[0]
//     else
//         return false
//     end
// end

module.exports = {
  create,
  encryptPassword,
  findById,
  findByEmail
}