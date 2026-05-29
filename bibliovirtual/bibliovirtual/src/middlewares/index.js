function authMiddleware(req, res, next) {
  if (req.session && req.session.usuario) {
    res.locals.usuario = req.session.usuario;
    return next();
  }
  req.session.redirectTo = req.originalUrl;
  res.redirect('/auth/login');
}

function adminMiddleware(req, res, next) {
  if (req.session && req.session.usuario && req.session.usuario.perfil === 'admin') {
    return next();
  }
  res.status(403).render('errors/acesso-negado', { usuario: req.session.usuario || null });
}

function setLocals(req, res, next) {
  res.locals.usuario = req.session.usuario || null;
  res.locals.erro = null;
  res.locals.sucesso = null;
  next();
}

module.exports = { authMiddleware, adminMiddleware, setLocals };
