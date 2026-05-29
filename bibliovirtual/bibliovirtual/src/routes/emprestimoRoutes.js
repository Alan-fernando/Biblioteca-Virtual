const express = require('express');
const router = express.Router();
const c = require('../controllers/emprestimoController');
const { authMiddleware } = require('../middlewares');

router.use(authMiddleware);
router.get('/meus', c.meusEmprestimos);
router.post('/', c.emprestar);
router.post('/:id/devolver', c.devolver);

module.exports = router;
