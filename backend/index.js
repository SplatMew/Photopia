
import {databaseConnection} from './database.js'
import {PORT} from './config.js'
import app from './app.js'

databaseConnection()


app.listen(PORT)
console.log('Server in running port', PORT)