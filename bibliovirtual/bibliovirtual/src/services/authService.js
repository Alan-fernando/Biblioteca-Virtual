const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const usuarioRepository = require('../repositories/usuarioRepository');

async function login(email, senha) {
  const usuario = usuarioRepository.findByEmail(email);
  if (!usuario) throw new Error('Email ou senha inválidos.');
  const ok = await bcrypt.compare(senha, usuario.senha);
  if (!ok) throw new Error('Email ou senha inválidos.');
  return usuario;
}

async function cadastrar({ nome, email, senha, confirmarSenha }) {
  if (!nome || !email || !senha) throw new Error('Preencha todos os campos obrigatórios.');
  if (senha !== confirmarSenha) throw new Error('As senhas não conferem.');
  if (senha.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres.');
  if (usuarioRepository.findByEmail(email)) throw new Error('Este e-mail já está cadastrado.');
  const hash = await bcrypt.hash(senha, 10);
  return usuarioRepository.create({
    id: uuidv4(),
    nome,
    email,
    senha: hash,
    perfil: 'leitor',
    createdAt: new Date().toISOString()
  });
}

module.exports = { login, cadastrar };
