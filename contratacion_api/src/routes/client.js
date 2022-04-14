const express = require('express');
const router = express.Router();

const { all, get, store, update } = require('../controllers/clientController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.get('/client',isAuthenticatedUser, all);
router.get('/client/:id',isAuthenticatedUser, get);

router.post('/client',isAuthenticatedUser, store);
router.put('/client/:id',isAuthenticatedUser, update);


module.exports = router
