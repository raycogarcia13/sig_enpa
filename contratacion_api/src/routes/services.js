const express = require('express');
const router = express.Router();

const { all, get, store, update } = require('../controllers/servicesController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.get('/service',isAuthenticatedUser, all);
router.get('/service/:id',isAuthenticatedUser, get);

router.post('/service',isAuthenticatedUser, store);
router.put('/service/:id',isAuthenticatedUser, update);


module.exports = router
