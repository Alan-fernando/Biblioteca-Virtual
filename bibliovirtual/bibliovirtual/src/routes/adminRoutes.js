const express = require('express');
const router = express.Router();
const livroCtrl = require('../controllers/livroController');
const emprestimoCtrl = require('../controllers/emprestimoController');
const adminCtrl = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares');

router.use(authMiddleware, adminMiddleware);

router.get('/', adminCtrl.dashboard);
router.get('/livros', livroCtrl.adminIndex);
router.get('/livros/novo', livroCtrl.getNovoLivro);
router.post('/livros', livroCtrl.postNovoLivro);
router.get('/livros/:id/editar', livroCtrl.getEditarLivro);
router.post('/livros/:id', livroCtrl.postEditarLivro);
router.post('/livros/:id/deletar', livroCtrl.deletarLivro);
router.get('/emprestimos', emprestimoCtrl.adminListar);
router.get('/usuarios', adminCtrl.listarUsuarios);

module.exports = router;
