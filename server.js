require('dotenv').config();
const client = require('./DB/client')
const express = require(`express`);
const app = express();

app.use(express.static(`public`));

const getconnected = async() => {
  try{
    await client.connect();
    console.log(`connected to database!`)
  }catch(error){
    console.log(`Cannot connect to client, Error:`, error)
  }

}
getconnected();
app.get(`/api/v1/employees`, async (req, res, next) => {
  try{

    const allEmployees = await client.query(`SELECT * FROM employees;`)
    // res.json(allEmployees.rows); returns an array of employee objects
    const { rows } = allEmployees;
    const employeeElements = rows.map((row)=>{return `<h2>${row.name}</h2><p>Is Admin: ${row.isadmin}</p><br>`}).join('')
    res.send(`
      <html>
        <head>
        <link rel="stylesheet" href="/styles.css">
        <title>Employee List</title>
        </head>
        <body>
          <h1>Employees</h1>
          ${employeeElements}
        </body>
      </html>
      `
    )
  } catch(error) {
    console.log(`Cannot GET employees, Error: ${error}`)
}
})

const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`Express Server Started: listening to ${PORT}`));
