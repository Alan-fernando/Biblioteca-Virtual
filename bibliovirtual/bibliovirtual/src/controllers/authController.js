const authService = require('../services/authService');

function getLogin(req, res) {
  if (req.session.usuario) return res.redirect('/');
  res.render('auth/login', { erro: null });
}

async function postLogin(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await authService.login(email, senha);
    req.session.usuario = { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil };
    const redir = req.session.redirectTo || (usuario.perfil === 'admin' ? '/admin' : '/');
    delete req.session.redirectTo;
    res.redirect(redir);
  } catch (err) {
    res.render('auth/login', { erro: err.message });
  }
}

function getCadastro(req, res) {
  if (req.session.usuario) return res.redirect('/');
  res.render('auth/cadastro', { erro: null });
}

async function postCadastro(req, res) {
  try {
    await authService.cadastrar(req.body);
    res.redirect('/auth/login?cadastrado=1');
  } catch (err) {
    res.render('auth/cadastro', { erro: err.message });
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = { getLogin, postLogin, getCadastro, postCadastro, logout };
