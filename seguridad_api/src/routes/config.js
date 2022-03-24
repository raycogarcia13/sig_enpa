const express = require('express');
const router = express.Router();

const { config } = require('../controllers/configController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.get('/config',isAuthenticatedUser,authorizeRoles('CTRRHH'), config);

module.exports = router