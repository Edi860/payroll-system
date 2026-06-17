const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
