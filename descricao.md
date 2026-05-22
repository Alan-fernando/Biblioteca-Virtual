# Descrição do Projeto

## Nome do Sistema
**BiblioVirtual** — Sistema de Biblioteca Virtual

---

## Tema Escolhido
Biblioteca Virtual: plataforma web para gerenciamento de acervo de livros, com funcionalidades de cadastro, busca, empréstimo e controle de leitura para usuários autenticados.

---

## Objetivo do Sistema
Desenvolver uma aplicação web funcional utilizando Node.js e Express que permita aos usuários gerenciar um acervo de livros de forma digital, possibilitando o cadastro de obras, controle de disponibilidade, realização de empréstimos virtuais e acompanhamento do histórico de leituras.

---

## Descrição Geral do Funcionamento
O sistema BiblioVirtual funciona com dois perfis de usuário: **Administrador** e **Leitor**.

- O **Administrador** é responsável pelo gerenciamento do acervo: pode cadastrar, editar e remover livros, além de visualizar todos os empréstimos ativos e o histórico do sistema.
- O **Leitor** pode pesquisar livros disponíveis, realizar empréstimos virtuais, devolver livros e acompanhar seu histórico de leituras.

O fluxo básico da aplicação é:
1. O usuário acessa a página pública com a listagem de livros disponíveis.
2. Para realizar um empréstimo, o usuário precisa estar autenticado (login/cadastro).
3. Após o login, o usuário acessa sua área privada com histórico e empréstimos ativos.
4. O administrador tem acesso a um painel exclusivo de gerenciamento.

Sessões são utilizadas para manter o estado de autenticação, e middlewares controlam o acesso às rotas privadas.

---

## Público-Alvo
- Estudantes e leitores em geral que desejam organizar suas leituras
- Pequenas bibliotecas comunitárias ou escolares que desejam digitalizar seu acervo
- Professores e educadores que precisam recomendar e controlar leituras para turmas

---

## Funcionalidades Principais

### Funcionalidades Públicas (sem login)
- Visualizar a listagem de livros do acervo
- Pesquisar livros por título, autor ou categoria
- Acessar a página de detalhes de um livro
- Realizar cadastro de novo usuário
- Realizar login

### Funcionalidades do Leitor (autenticado)
- Realizar empréstimo de um livro disponível
- Devolver livro emprestado
- Visualizar histórico pessoal de empréstimos
- Editar perfil pessoal

### Funcionalidades do Administrador (autenticado + perfil admin)
- Cadastrar novo livro no acervo
- Editar informações de um livro
- Remover livro do acervo
- Listar todos os empréstimos ativos
- Visualizar histórico completo de empréstimos
- Gerenciar usuários
