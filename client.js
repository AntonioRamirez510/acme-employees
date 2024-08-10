require(`dotenv`).config();
import { Client } from 'pg'

const client = new Client(`${DB_URL}`)

client.connect();
console.log(`connected to DB!`)
