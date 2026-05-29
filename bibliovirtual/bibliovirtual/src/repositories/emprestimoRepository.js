const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../../data/emprestimos.json');

function readAll() {
  return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
}

function writeAll(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function findAll() {
  return readAll();
}

function findById(id) {
  return readAll().find(e => e.id === id) || null;
}

function findByUsuario(usuarioId) {
  return readAll().filter(e => e.usuarioId === usuarioId);
}

function findAtivoByLivro(livroId) {
  return readAll().find(e => e.livroId === livroId && e.status === 'ativo') || null;
}

function create(emprestimo) {
  const lista = readAll();
  lista.push(emprestimo);
  writeAll(lista);
  return emprestimo;
}

function update(id, dados) {
  const lista = readAll();
  const idx = lista.findIndex(e => e.id === id);
  if (idx === -1) return null;
  lista[idx] = { ...lista[idx], ...dados };
  writeAll(lista);
  return lista[idx];
}

module.exports = { findAll, findById, findByUsuario, findAtivoByLivro, create, update };
