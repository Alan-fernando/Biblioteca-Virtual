const express = require('express');
const router = express.Router();
const c = require('../controllers/livroController');

router.get('/', c.index);
router.get('/:id', c.detalhe);

module.exports = router;
