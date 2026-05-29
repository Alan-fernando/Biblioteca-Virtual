const livroService = require('../services/livroService');
const emprestimoService = require('../services/emprestimoService');
const usuarioRepository = require('../repositories/usuarioRepository');

function dashboard(req, res) {
  const livros = livroService.listar();
  const emprestimos = emprestimoService.listarTodos();
  const usuarios = usuarioRepository.findAll();
  const ativos = emprestimos.filter(e => e.status === 'ativo');
  const ultimos = emprestimos.slice(-5).reverse();
  res.render('admin/dashboard', {
    totalLivros: livros.length,
    totalEmprestimosAtivos: ativos.length,
    totalUsuarios: usuarios.length,
    ultimos
  });
}

function listarUsuarios(req, res) {
  const usuarios = usuarioRepository.findAll().map(u => ({ id: u.id, nome: u.nome, email: u.email, perfil: u.perfil, createdAt: u.createdAt }));
  res.render('admin/usuarios', { usuarios });
}

module.exports = { dashboard, listarUsuarios };
