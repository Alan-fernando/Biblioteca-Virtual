// authRoutes.js
const express = require('express');
const router = express.Router();
const c = require('../controllers/authController');

router.get('/login', c.getLogin);
router.post('/login', c.postLogin);
router.get('/cadastro', c.getCadastro);
router.post('/cadastro', c.postCadastro);
router.get('/logout', c.logout);

module.exports = router;
