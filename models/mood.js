const { Pool } = require('pg')

const db = new Pool({
  database: 'moodtracker'
})

function all() {
  let sql = 'select * from user_data;'

  return db.query(sql)
}

function single(date) {
  let sql = 'select * from user_data where date(date) = $1;'

  return db.query(sql, [date])
}

function create(mood, habits, comment, date) {
  let sql = 'insert into user_data (mood, habits, comment, date) values ($1, $2, $3, $4) returning *;'

  return db.query(sql, [mood, habits, comment, date])
}

module.exports = {
  all,
  single,
  create
}