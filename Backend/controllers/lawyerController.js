import bcrypt from 'bcrypt';
import connection from '../config/db.js';

/* ******************************* */
// 📝 Lawyer Authentication (Sign Up)
/* ******************************* */

export const authenticateLawyer = async (req, res) => {
    const { full_name, email, password, confirm_password, specialization, phone_number, lawyer_credentials } = req.body;

    // ✅ Input Validation
    if (!full_name || !email || !password || !confirm_password || !specialization || !phone_number || !lawyer_credentials) {
        return res.status(400).json({ error: '⚠️ Please fill out all fields!' });
    }
    if (password !== confirm_password) {
        return res.status(400).json({ error: '⚠️ Passwords do not match! Please try again.' });
    }

    try {
        // Check if email already exists
        const checkEmailQuery = 'SELECT * FROM lawyer WHERE email = ?';
        connection.query(checkEmailQuery, [email], (err, results) => {
            if (err) {
                console.error('❌ Error checking email:', err);
                return res.status(500).json({ error: '❌ Something went wrong while checking the email. Please try again later.' });
            }
            if (results.length > 0) {
                return res.status(400).json({ error: '⚠️ This email is already registered. Please use a different email.' });
            }

            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);

            const query = `
                INSERT INTO lawyer (full_name, email, password, specialization, phone_number, lawyer_credentials) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            connection.query(
                query, 
                [full_name, email, hashedPassword, specialization, phone_number, lawyer_credentials], 
                (err, _results) => {
                    if (err) {
                        console.error('❌ Error registering lawyer:', err);
                        return res.status(500).json({ error: '❌ There was an issue registering your account. Please try again later.' });
                    }
                    res.status(201).json({ 
                        message: `🎓 Thank you, ${full_name}, for choosing us! Your registration as a lawyer was successful. 
                                  Our team will review your credentials, and the authentication process may take up to three days. 
                                  We appreciate your patience and look forward to working with you.` 
                    });
                }
            );
        });
    } catch (error) {
        console.error('❌ Error hashing password:', error);
        res.status(500).json({ error: '❌ Something went wrong. Please try again later.' });
    }
};


/* ******************************* */
// 📝 Lawyer login
/* ******************************* */
export const login = async (req, res) => {
    const { email, password } = req.body;

    // ✅ Input Validation
    if (!email || !password) {
        return res.status(400).json({ error: '⚠️ Please fill out all fields!' });
    }

    try {
        const query = 'SELECT * FROM lawyer WHERE email = ?';
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

            res.status(200).json({ message: '🎉 You are now logged in!' });
        });
    } catch (error) {
        console.error('❌ Error logging in:', error);
        res.status(500).json({ error: '❌ Something went wrong. Please try again later.' });
    }
};

/* ******************************* */
// 📝 Fetch Lawyer
/* ******************************* */

export const fetchLawyer = (req, res) => {
    const query = 'SELECT * FROM lawyer';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching lawyers:', err);
            return res.status(500).json({ error: '❌ There was an issue fetching lawyers. Please try again later.' });
        }
        res.status(200).json(results);
    }); };

/* ******************************* */
// 📝 Approve Lawyer
/* ******************************* */

export const approveLawyer = (req, res) => {
    const { lawyer_id } = req.params;
    const query = 'UPDATE lawyer SET is_accepted = 1 WHERE lawyer_id = ?';
    connection.query(query, [lawyer_id], (err, results) => {
        if (err) {
            console.error('❌ Error approving lawyer:', err);
            return res.status(500).json({ error: '❌ There was an issue approving the lawyer. Please try again later.' });
        }
        res.status(200).json(results);
    });
};

/* ******************************* */
// 📝 Delete Lawyer
/* ******************************* */

export const deleteLawyer = (req, res) => {
    const { lawyer_id } = req.params;
    const query = 'DELETE FROM lawyer WHERE lawyer_id = ?';
    connection.query(query, [lawyer_id], (err, _results) => {
        if (err) {
            console.error('❌ Error deleting lawyer:', err);
            return res.status(500).json({ error: '❌ There was an issue deleting the lawyer. Please try again later.' });
        }
        res.status(200).json({ message: '🗑️ Lawyer deleted successfully!' });
    });
};
