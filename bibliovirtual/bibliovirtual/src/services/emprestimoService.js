const { v4: uuidv4 } = require('uuid');
const emprestimoRepository = require('../repositories/emprestimoRepository');
const livroRepository = require('../repositories/livroRepository');
const usuarioRepository = require('../repositories/usuarioRepository');

function meusEmprestimos(usuarioId) {
  const emprestimos = emprestimoRepository.findByUsuario(usuarioId);
  return emprestimos.map(e => ({
    ...e,
    livro: livroRepository.findById(e.livroId)
  }));
}

function listarTodos() {
  const emprestimos = emprestimoRepository.findAll();
  return emprestimos.map(e => ({
    ...e,
    livro: livroRepository.findById(e.livroId),
    usuario: (() => {
      const u = usuarioRepository.findById(e.usuarioId);
      return u ? { id: u.id, nome: u.nome, email: u.email } : null;
    })()
  }));
}

function emprestar(usuarioId, livroId) {
  const livro = livroRepository.findById(livroId);
  if (!livro) throw new Error('Livro não encontrado.');
  if (!livro.disponivel) throw new Error('Este livro não está disponível para empréstimo.');
  const empAtivo = emprestimoRepository.findAtivoByLivro(livroId);
  if (empAtivo) throw new Error('Este livro já está emprestado.');

  const emprestimo = emprestimoRepository.create({
    id: uuidv4(),
    usuarioId,
    livroId,
    dataEmprestimo: new Date().toISOString(),
    dataDevolucao: null,
    status: 'ativo'
  });
  livroRepository.update(livroId, { disponivel: false });
  return emprestimo;
}

function devolver(emprestimoId, usuarioId) {
  const emprestimo = emprestimoRepository.findById(emprestimoId);
  if (!emprestimo) throw new Error('Empréstimo não encontrado.');
  if (emprestimo.usuarioId !== usuarioId) throw new Error('Você não tem permissão para devolver este empréstimo.');
  if (emprestimo.status === 'devolvido') throw new Error('Este livro já foi devolvido.');

  emprestimoRepository.update(emprestimoId, {
    dataDevolucao: new Date().toISOString(),
    status: 'devolvido'
  });
  livroRepository.update(emprestimo.livroId, { disponivel: true });
}

module.exports = { meusEmprestimos, listarTodos, emprestar, devolver };
