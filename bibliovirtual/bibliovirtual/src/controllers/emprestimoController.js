const emprestimoService = require('../services/emprestimoService');

function meusEmprestimos(req, res) {
  const emprestimos = emprestimoService.meusEmprestimos(req.session.usuario.id);
  const ativos = emprestimos.filter(e => e.status === 'ativo');
  const historico = emprestimos.filter(e => e.status === 'devolvido');
  res.render('emprestimos/meus', { ativos, historico, sucesso: req.query.sucesso || null, erro: req.query.erro || null });
}

function emprestar(req, res) {
  try {
    emprestimoService.emprestar(req.session.usuario.id, req.body.livroId);
    res.redirect('/emprestimos/meus?sucesso=Empréstimo+realizado+com+sucesso!');
  } catch (err) {
    res.redirect('/livros/' + req.body.livroId + '?erro=' + encodeURIComponent(err.message));
  }
}

function devolver(req, res) {
  try {
    emprestimoService.devolver(req.params.id, req.session.usuario.id);
    res.redirect('/emprestimos/meus?sucesso=Livro+devolvido+com+sucesso!');
  } catch (err) {
    res.redirect('/emprestimos/meus?erro=' + encodeURIComponent(err.message));
  }
}

function adminListar(req, res) {
  const emprestimos = emprestimoService.listarTodos();
  res.render('admin/emprestimos', { emprestimos });
}

module.exports = { meusEmprestimos, emprestar, devolver, adminListar };
