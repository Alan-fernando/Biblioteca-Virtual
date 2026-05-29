const express = require('express');
const session = require('express-session');
const path = require('path');

const { setLocals } = require('./src/middlewares');
const authRoutes = require('./src/routes/authRoutes');
const livroRoutes = require('./src/routes/livroRoutes');
const emprestimoRoutes = require('./src/routes/emprestimoRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const livroService = require('./src/services/livroService');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(session({
  secret: 'bibliovirtual-secret-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24h
}));

// Locals middleware (usuario disponível em todas as views)
app.use(setLocals);

// Pass query string to views (flash-like for auth)
app.use((req, res, next) => {
  if (req.query.cadastrado) res.locals.cadastrado = true;
  if (req.query.erro) res.locals.erro = req.query.erro;
  if (req.query.sucesso) res.locals.sucesso = req.query.sucesso;
  next();
});

// Home route
app.get('/', (req, res) => {
  const livros = livroService.listar().slice(0, 6);
  res.render('index', { livros });
});

// Routes
app.use('/auth', authRoutes);
app.use('/livros', livroRoutes);
app.use('/emprestimos', emprestimoRoutes);
app.use('/admin', adminRoutes);

app.get('/acesso-negado', (req, res) => {
  res.status(403).render('errors/acesso-negado');
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).render('errors/404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('errors/404');
});

module.exports = app;
