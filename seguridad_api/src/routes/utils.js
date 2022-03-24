const express = require('express');
const router = express.Router();

const { sendEmail } = require('../controllers/emailController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.post('/email', sendEmail);

module.exports = router
