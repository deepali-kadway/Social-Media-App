const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    try{
    const db = req.app.locals.db
    const {inputIdentifier, inputIdentifierType, passwordInput } = req.body;

    let query;
    switch(inputIdentifierType){
        case 'emailInput':
            query = 'SELECT * FROM users WHERE email = ?'
            break;
        case 'phoneInput':
            query = 'SELECT * FROM users WHERE phone = ?'
            break;
        case 'usernameInput':
            query = 'SELECT * FROM users WHERE username = ?'
            break;
        default:
            return res.status(400).json({message: 'Invalid Identifier Type'})
    }

    db.query(query, [inputIdentifier], async (err, results) => {
        if(err){
            console.log("Database query error: ", err);
            return res.status(500).json({message: 'Database Error', error: err.message})
        }

        if(results.length === 0){
            console.log("User not Found");
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const user = results[0]
        console.log('USER FOUND: ', {id: user.id, username: user.username, name: user.fullname, email: user.email});
        
        const decryptHashedPassword = await bcrypt.compare(passwordInput, user.password)
        if(!decryptHashedPassword){
            console.log("Password is Invalid");
           return res.status(401).json({message: 'Invalid Credentials'})
        }

        const userResponse = {
            id: user.id,
            fullname: user.fullname,
            // email: user.email,
            // phone: user.phone,
            username: user.username,
            // created_at: user.created_at,
        };

        return res.status(200).json({message: "Login Successfull", user: userResponse})
    })
    }
  catch (error) {
        // console.error('=== LOGIN UNEXPECTED ERROR ===');
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected error', error: error.message });
    }
})

module.exports = router