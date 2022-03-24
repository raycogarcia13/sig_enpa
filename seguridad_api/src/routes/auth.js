const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.post('/login', login);
router.post('/logout', isAuthenticatedUser, logout);

module.exports = router
