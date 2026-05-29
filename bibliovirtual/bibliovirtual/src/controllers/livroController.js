const livroService = require('../services/livroService');

function index(req, res) {
  const { q } = req.query;
  const livros = livroService.buscar(q);
  res.render('livros/listagem', { livros, query: q || '' });
}

function detalhe(req, res) {
  try {
    const livro = livroService.buscarPorId(req.params.id);
    res.render('livros/detalhe', { livro });
  } catch (err) {
    res.status(404).render('errors/404');
  }
}

// Admin
function adminIndex(req, res) {
  const livros = livroService.listar();
  res.render('admin/livros', { livros, sucesso: req.query.sucesso || null, erro: req.query.erro || null });
}

function getNovoLivro(req, res) {
  res.render('livros/form', { livro: null, erro: null });
}

function postNovoLivro(req, res) {
  try {
    livroService.criar(req.body);
    res.redirect('/admin/livros?sucesso=Livro+cadastrado+com+sucesso!');
  } catch (err) {
    res.render('livros/form', { livro: null, erro: err.message });
  }
}

function getEditarLivro(req, res) {
  try {
    const livro = livroService.buscarPorId(req.params.id);
    res.render('livros/form', { livro, erro: null });
  } catch (err) {
    res.status(404).render('errors/404');
  }
}

function postEditarLivro(req, res) {
  try {
    livroService.atualizar(req.params.id, req.body);
    res.redirect('/admin/livros?sucesso=Livro+atualizado+com+sucesso!');
  } catch (err) {
    const livro = { ...req.body, id: req.params.id };
    res.render('livros/form', { livro, erro: err.message });
  }
}

function deletarLivro(req, res) {
  try {
    livroService.remover(req.params.id);
    res.redirect('/admin/livros?sucesso=Livro+removido+com+sucesso!');
  } catch (err) {
    res.redirect('/admin/livros?erro=' + encodeURIComponent(err.message));
  }
}

module.exports = { index, detalhe, adminIndex, getNovoLivro, postNovoLivro, getEditarLivro, postEditarLivro, deletarLivro };
