require('dotenv').config();
const client = require(`./client`);

const dropTables = async() => {
  try{
    await client.query(
      `
      DROP TABLE IF EXISTS employees;
     `
    )
  } catch(error) {
  console.log(`Encountered an error with Drop Tables: ${error}`)
  }
}

const createTables = async () => {
  try{
    await client.query(`
      CREATE TABLE employees
      (id SERIAL PRIMARY KEY,
       name VARCHAR(49),
       isadmin BOOLEAN
      );
      `)
  } catch(e) {
    console.log(`Error while createTables: ${e}`)
  }
}

const seedTheTable = async() => {
  try{
    await client.query(
      `
      INSERT INTO employees (name, isadmin)
      VALUES ('Antonio', true),
      ('Ralph', false),
      ('Teddy', false),
      ('George', false),
      ('Alex', false),
      ('Rick',false)
      ;
      `)
  } catch(e) {console.log(`Error while seedTheTable: ${e}`)}
}


const syncAndSeed = async () =>{
  try{
    await client.connect();
    console.log(`connected to DB!`)

    await dropTables();
    console.log(`table employees dropped`)

    await createTables();
    console.log(`Table employees Created!`);

    await seedTheTable();
    console.log(`Table has been seeded with employees!`)
    await client.end();
    console.log(`Terminated connection with DB`)
  } catch(error) {
    console.log(`Encountered an error while syncAndSeed: ${error}`);
  }
}
syncAndSeed();

module.exports = {
  dropTables,
  createTables,
  seedTheTable,
  syncAndSeed
}
