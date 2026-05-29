# 📚 BiblioVirtual

Sistema de Biblioteca Virtual desenvolvido com Node.js e Express, aplicando arquitetura em camadas (Controller → Service → Repository).

## 🚀 Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor
node server.js

# 3. Acessar no navegador
http://localhost:3000
```

## 🔑 Credenciais Demo

| Perfil    | E-mail                     | Senha    |
|-----------|----------------------------|----------|
| Admin     | admin@bibliovirtual.com    | password |
| Leitor    | joao@email.com             | password |

## 🗂️ Estrutura do Projeto

```
bibliovirtual/
├── app.js                    # Express + middlewares + rotas
├── server.js                 # Inicialização do servidor
├── data/                     # Persistência em JSON
│   ├── usuarios.json
│   ├── livros.json
│   └── emprestimos.json
├── src/
│   ├── controllers/          # Recebe req/res, chama service
│   ├── services/             # Regras de negócio
│   ├── repositories/         # Acesso aos dados JSON
│   ├── middlewares/          # authMiddleware, adminMiddleware
│   └── routes/               # Definição das rotas
├── views/                    # Templates EJS
│   ├── auth/                 # Login, Cadastro
│   ├── livros/               # Listagem, Detalhe, Form
│   ├── emprestimos/          # Meus Empréstimos
│   ├── admin/                # Dashboard, Livros, Empréstimos, Usuários
│   ├── errors/               # 404, 403
│   └── partials/             # Header, Footer
└── public/css/style.css      # Estilos
```

## 🔒 Rotas

### Públicas
- `GET /` — Home
- `GET /livros` — Listagem
- `GET /livros/:id` — Detalhe
- `GET /auth/login` + `POST /auth/login`
- `GET /auth/cadastro` + `POST /auth/cadastro`
- `GET /auth/logout`

### Privadas (login obrigatório)
- `GET /emprestimos/meus`
- `POST /emprestimos`
- `POST /emprestimos/:id/devolver`

### Admin (login + perfil admin)
- `GET /admin`
- `GET/POST /admin/livros`
- `GET/POST /admin/livros/:id`
- `POST /admin/livros/:id/deletar`
- `GET /admin/emprestimos`
- `GET /admin/usuarios`

## 🏗️ Arquitetura

**Controller** → Recebe req/res, chama Service  
**Service** → Regras de negócio (validações, disponibilidade)  
**Repository** → Leitura/escrita nos arquivos JSON  
**Middleware** → authMiddleware (sessão) + adminMiddleware (perfil)
