const express = require('express')
const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { username } = req.query; 

        if (!username) {
            return res.status(400).json({message: "Username parameter is required"});
        }

        const query = 'SELECT id, username, fullname FROM users WHERE username LIKE ?';
        const searchTerm = `%${username}%`; // wildcards for partial matching
        
        db.query(query, [searchTerm], async (error, results) => {
            if(error){
                console.log("Database query error: ", error);
                return res.status(500).json({message: "Internal Server Error", error: error.message});
            }

            if(results.length === 0){
                console.log("No users found with username:", username);
                return res.status(200).json([]); // returning empty array for no results
            }

            // Map results ro create array of user objects
            const users = results.map(user => ({
                id: user.id,
                username: user.username,
                fullname: user.fullname
            }));

            console.log(`Found ${users.length} users matching "${username}"`);
            return res.status(200).json(users); // Return array of users
        });
    } catch (error) {
        console.error('Unexpected error in search route:', error);
        return res.status(500).json({message: 'Unexpected error occurred', error: error.message});
    }
});

module.exports = router;