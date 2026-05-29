const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../../data/usuarios.json');

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
  return readAll().find(u => u.id === id) || null;
}

function findByEmail(email) {
  return readAll().find(u => u.email === email) || null;
}

function create(usuario) {
  const lista = readAll();
  lista.push(usuario);
  writeAll(lista);
  return usuario;
}

function update(id, dados) {
  const lista = readAll();
  const idx = lista.findIndex(u => u.id === id);
  if (idx === -1) return null;
  lista[idx] = { ...lista[idx], ...dados };
  writeAll(lista);
  return lista[idx];
}

module.exports = { findAll, findById, findByEmail, create, update };
