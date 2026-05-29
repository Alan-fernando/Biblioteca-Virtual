const { v4: uuidv4 } = require('uuid');
const livroRepository = require('../repositories/livroRepository');
const emprestimoRepository = require('../repositories/emprestimoRepository');

function listar() {
  return livroRepository.findAll();
}

function buscar(query) {
  if (!query || query.trim() === '') return livroRepository.findAll();
  return livroRepository.search(query);
}

function buscarPorId(id) {
  const livro = livroRepository.findById(id);
  if (!livro) throw new Error('Livro não encontrado.');
  return livro;
}

function criar({ titulo, autor, categoria, ano, sinopse }) {
  if (!titulo || !autor || !categoria) throw new Error('Título, autor e categoria são obrigatórios.');
  return livroRepository.create({
    id: uuidv4(),
    titulo,
    autor,
    categoria,
    ano: parseInt(ano) || new Date().getFullYear(),
    sinopse: sinopse || '',
    disponivel: true,
    createdAt: new Date().toISOString()
  });
}

function atualizar(id, dados) {
  const livro = livroRepository.findById(id);
  if (!livro) throw new Error('Livro não encontrado.');
  return livroRepository.update(id, {
    titulo: dados.titulo || livro.titulo,
    autor: dados.autor || livro.autor,
    categoria: dados.categoria || livro.categoria,
    ano: parseInt(dados.ano) || livro.ano,
    sinopse: dados.sinopse !== undefined ? dados.sinopse : livro.sinopse,
  });
}

function remover(id) {
  const empAtivo = emprestimoRepository.findAtivoByLivro(id);
  if (empAtivo) throw new Error('Não é possível remover um livro com empréstimo ativo.');
  const ok = livroRepository.remove(id);
  if (!ok) throw new Error('Livro não encontrado.');
}

module.exports = { listar, buscar, buscarPorId, criar, atualizar, remover };
