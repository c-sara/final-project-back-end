const { Pool } = require('pg')

let db;
if (process.env.NODE_ENV === 'production') {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  db = new Pool({
    database: 'moodtracker'
  })
}

function all(userId) {
  let sql = 'select distinct on (date::date) id, user_id, mood, habits, comment, date from user_data where user_id = $1;'

  return db.query(sql, [userId])
}

function single(date, userId) {
  let sql = 'select * from user_data where date(date) = $1 and user_id = $2 order by id desc;'

  return db.query(sql, [date, userId])
}

function create(userId, mood, habits, comment, date) {
  let sql = 'insert into user_data (user_id, mood, habits, comment, date) values ($1, $2, $3, $4, $5) returning *;'

  return db.query(sql, [userId, mood, habits, comment, date])
}

module.exports = {
  all,
  single,
  create
}