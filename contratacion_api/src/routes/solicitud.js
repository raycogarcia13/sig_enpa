const express = require('express');
const router = express.Router();

const { all, nomenclators, get, store, update } = require('../controllers/contratacion/solicitudController')

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

router.get('/solicitud',isAuthenticatedUser, all);
router.get('/solicitud_nomen',isAuthenticatedUser, nomenclators);

router.post('/solicitud',isAuthenticatedUser, store);


module.exports = router
