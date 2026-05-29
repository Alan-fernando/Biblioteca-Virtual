const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../../data/livros.json');

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
  return readAll().find(l => l.id === id) || null;
}

function search(query) {
  const q = query.toLowerCase();
  return readAll().filter(l =>
    l.titulo.toLowerCase().includes(q) ||
    l.autor.toLowerCase().includes(q) ||
    l.categoria.toLowerCase().includes(q)
  );
}

function create(livro) {
  const lista = readAll();
  lista.push(livro);
  writeAll(lista);
  return livro;
}

function update(id, dados) {
  const lista = readAll();
  const idx = lista.findIndex(l => l.id === id);
  if (idx === -1) return null;
  lista[idx] = { ...lista[idx], ...dados };
  writeAll(lista);
  return lista[idx];
}

function remove(id) {
  const lista = readAll();
  const idx = lista.findIndex(l => l.id === id);
  if (idx === -1) return false;
  lista.splice(idx, 1);
  writeAll(lista);
  return true;
}

module.exports = { findAll, findById, search, create, update, remove };
