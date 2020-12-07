const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
const port = 3000
const dbConfig = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nginxdb'
}

async function insertExampleData() {
  let sql = `Insert into people (name) values ('Arthur')`
  let connection = await mysql.createConnection(dbConfig)
  await connection.query(sql)
}

insertExampleData()

app.get('/', async (req, res) => {
  let html = '<h1>Full Cycle Rocks!</h1>'
  let people = ''

  sql = `Select name from people;`

  connection = await mysql.createConnection(dbConfig)
  const [rows] = await connection.query(sql)

  for (let i = 0; i < rows.length; i++) {
    people += `<p>${rows[i].name}</p>`
  }

  res.send(html + people)
})

app.listen(port, () => {
  console.log(`Server running! Listen on ${port}`)
})
