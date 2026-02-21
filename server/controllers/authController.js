const authService = require('../services/authService');

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await authService.registerUser({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        const status = error.message === 'User already exists' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await authService.loginUser(email, password);
        res.json(user);
    } catch (error) {
        const status = error.message === 'Invalid email or password' ? 401 : 500;
        res.status(status).json({ message: error.message });
    }
};

module.exports = { register, login };
