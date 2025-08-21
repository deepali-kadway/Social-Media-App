const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { log } = require('console')

router.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Request Received`);
    console.log(`Request Body:`, req.body);
    next();    
})

router.post('/register', async (req, res) => {
  try{
    const db = req.app.locals.db;
    const {nameInput, emailInput, phoneInput, usernameInput, passwordInput } = req.body;

    const hashedPassword = await bcrypt.hash(passwordInput, 10);
    const userID = uuidv4();

    const insertQuery = `INSERT INTO users (id, fullname, email, phone, username, password) VALUES (?, ?, ?, ?, ?, ?)`
    db.query(insertQuery, [userID, nameInput, emailInput, phoneInput, usernameInput, hashedPassword], (err, result) => {
        if(err){
            return res.status(500).json({message: 'Database Error', error: err.message, code: err.code});
        }
        
        const userResponse = {
            id: userID,
            fullname: nameInput,
            username: usernameInput,
        };
        
        return res.status(201).json({
            message:'User registered successfully', 
            user: userResponse
        });
    });
  }
  catch(error){
    console.error('Unexpected Error: ', error);
    return res.status(500).json({message: 'Unexpected Error Occured: ', error: error.message})
  }
});

module.exports = router;