const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const cors = require('cors');
const { log } = require('console');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if(err){
        console.log('Database Connection Failed: ', err);
        return;
    }
    console.log('Connected to Database');
})

app.locals.db = db;

app.use('/users', require('./routes/registrationRoute'))
app.use('/users', require('./routes/loginRoute'))
app.use('/friends', require('./routes/searchFriendsRoutes'))

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
})