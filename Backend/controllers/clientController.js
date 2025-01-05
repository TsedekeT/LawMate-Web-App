// Accept client full name, email, password, confirm password.
//  validate the input, hash the password, and store the client's information in the database.
import bcrypt from 'bcrypt';
import connection from '../config/db.js';

// 🌍 Server Health Check
export const healthCheck = (_req, res) => {
    res.send('🌍 Hello, World! Server is running correctly. The route is working.');
};

// 📝 Client Registration (Sign Up) 
export const signUp = async (req, res) => {
    const { full_name, email, password, confirm_password } = req.body;

    // ✅ Input Validation
    if (!full_name || !email || !password || !confirm_password) {
        return res.status(400).json({ error: '⚠️ Please fill out all fields!' });
    }
    if (password !== confirm_password) {
        return res.status(400).json({ error: '⚠️ Passwords do not match! Please try again.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO client (full_name, email, password) VALUES (?, ?, ?)';
        connection.query(query, [full_name, email, hashedPassword], (err, _results) => {
            if (err) {
                console.error('❌ Error registering user:', err);
                return res.status(500).json({ error: err //'❌ There was an issue registering your account. Please try again later.'
                
                });
            }
            res.status(201).json({ message: `🎉 Welcome, ${full_name}! Your registration was successful!` });
        });
    } catch (error) {
        console.error('❌ Error hashing password:', error);
        res.status(500).json({ error: '❌ Something went wrong. Please try again later.' });
    }
};



// 📝 client login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // ✅ Input Validation
    if (!email || !password) {
        return res.status(400).json({ error: '⚠️ Please fill out all fields!' });
    }

    try {
        const query = 'SELECT * FROM client WHERE email = ?';
        connection.query(query, [email], async (err, results) => {
            if (err) {
                console.error('❌ Error logging in:', err);
                return res.status(500).json({ error: '❌ There was an issue logging into your account. Please try again later.' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: '⚠️ Invalid email or password. Please try again.' });
            }

            const hashedPassword = results[0].password;
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

            if (!isPasswordCorrect) {
                return res.status(401).json({ error: '⚠️ Invalid email or password. Please try again.' });
            }

            res.status(200).json({ message: '🎉 You have successfully logged in!' });
        });
    } catch (error) {
        console.error('❌ Error logging in:', error);
        res.status(500).json({ error: '❌ Something went wrong. Please try again later.' });
    }

};
