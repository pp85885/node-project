const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();



// user Registration
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                status: false,
                message: "Email is already taken!"
            })
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            status: true,
            message: "User created."
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Validate password
//         const isPasswordValid = await user.comparePassword(password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate JWT token
//         // const token = jwt.sign(
//         //     { email: user.email },
//         //     'secret',
//         //     { expiresIn: '1h' }
//         // );

//         const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
//             expiresIn: '1h',
//         });

//         // Respond with the token
//         res.json({ token });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ error: err.message });
//     }
// };
