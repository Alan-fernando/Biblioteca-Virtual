# Planejamento Técnico — Arquitetura do Sistema

## Estrutura de Pastas

```
bibliovirtual/
├── src/
│   ├── controllers/
│   │   ├── authController.js        # Login, logout, cadastro
│   │   ├── livroController.js       # CRUD de livros
│   │   ├── emprestimoController.js  # Empréstimos e devoluções
│   │   └── usuarioController.js     # Perfil e gestão de usuários
│   │
│   ├── services/
│   │   ├── authService.js           # Lógica de autenticação e senha
│   │   ├── livroService.js          # Regras de negócio de livros
│   │   ├── emprestimoService.js     # Regras de empréstimo/devolução
│   │   └── usuarioService.js        # Regras de perfil e usuários
│   │
│   ├── repositories/
│   │   ├── livroRepository.js       # Acesso a dados de livros
│   │   ├── emprestimoRepository.js  # Acesso a dados de empréstimos
│   │   └── usuarioRepository.js     # Acesso a dados de usuários
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js        # Verifica sessão ativa
│   │   ├── adminMiddleware.js       # Verifica perfil administrador
│   │   └── errorMiddleware.js       # Tratamento global de erros
│   │
│   ├── routes/
│   │   ├── publicRoutes.js          # Rotas sem autenticação
│   │   ├── authRoutes.js            # Rotas de login/cadastro
│   │   ├── livroRoutes.js           # Rotas de livros (mistas)
│   │   ├── emprestimoRoutes.js      # Rotas de empréstimos (privadas)
│   │   └── adminRoutes.js           # Rotas administrativas (admin)
│   │
│   ├── models/
│   │   ├── Usuario.js               # Modelo de usuário
│   │   ├── Livro.js                 # Modelo de livro
│   │   └── Emprestimo.js            # Modelo de empréstimo
│   │
│   └── views/
│       ├── layouts/
│       │   └── main.html            # Layout base
│       ├── partials/
│       │   ├── header.html
│       │   └── footer.html
│       ├── auth/
│       │   ├── login.html
│       │   └── cadastro.html
│       ├── livros/
│       │   ├── listagem.html
│       │   ├── detalhe.html
│       │   ├── form.html            # Criar/Editar
│       │   └── admin-listagem.html
│       ├── emprestimos/
│       │   ├── meus-emprestimos.html
│       │   └── admin-emprestimos.html
│       ├── usuario/
│       │   └── perfil.html
│       └── errors/
│           ├── 404.html
│           └── acesso-negado.html
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│
├── data/                            # Armazenamento JSON (sem banco de dados)
│   ├── usuarios.json
│   ├── livros.json
│   └── emprestimos.json
│
├── app.js                           # Configuração do Express e middlewares
├── server.js                        # Inicialização do servidor
├── package.json
└── .env
```

---

## Descrição das Responsabilidades

### Controller
- Recebe as requisições HTTP (req, res)
- Valida e extrai os dados da requisição (body, params, query, session)
- Chama o Service correspondente para processar a lógica
- Retorna a resposta adequada (renderiza view ou redireciona)
- **Não contém lógica de negócio nem acessa dados diretamente**

### Service
- Contém toda a lógica de negócio da aplicação
- Valida regras como: livro disponível para empréstimo, usuário com empréstimos em atraso, limite de empréstimos por usuário
- Coordena chamadas entre diferentes Repositories quando necessário
- Retorna dados processados para o Controller
- **Não conhece req/res nem acessa arquivos/banco diretamente**

### Repository
- Responsável exclusivamente pelo acesso e persistência de dados (arquivos JSON)
- Realiza operações de leitura e escrita nos arquivos de dados
- Fornece métodos como: `findAll()`, `findById()`, `create()`, `update()`, `delete()`
- **Não contém lógica de negócio**

### Middlewares
- **authMiddleware**: Verifica se existe sessão ativa; redireciona para login se não existir
- **adminMiddleware**: Verifica se o usuário autenticado tem perfil `admin`; retorna 403 se não
- **errorMiddleware**: Captura erros não tratados, registra e retorna página de erro amigável

---

## Organização das Rotas

| Arquivo            | Prefixo       | Tipo    | Descrição                          |
|--------------------|---------------|---------|------------------------------------|
| publicRoutes.js    | `/`           | Pública | Home, listagem de livros, detalhes |
| authRoutes.js      | `/auth`       | Pública | Login, logout, cadastro            |
| livroRoutes.js     | `/livros`     | Mista   | Listar (público), criar/editar (admin) |
| emprestimoRoutes.js| `/emprestimos`| Privada | Empréstimos e devoluções           |
| adminRoutes.js     | `/admin`      | Admin   | Painel administrativo completo     |

---

## Entidades do Sistema

### Usuario
| Campo       | Tipo    | Descrição                     |
|-------------|---------|-------------------------------|
| id          | string  | Identificador único (UUID)    |
| nome        | string  | Nome completo                 |
| email       | string  | Email (único)                 |
| senha       | string  | Hash da senha                 |
| perfil      | string  | `"leitor"` ou `"admin"`       |
| createdAt   | date    | Data de cadastro              |

### Livro
| Campo       | Tipo    | Descrição                     |
|-------------|---------|-------------------------------|
| id          | string  | Identificador único (UUID)    |
| titulo      | string  | Título do livro               |
| autor       | string  | Nome do autor                 |
| categoria   | string  | Gênero/categoria              |
| ano         | number  | Ano de publicação             |
| sinopse     | string  | Descrição do livro            |
| disponivel  | boolean | Se está disponível para empréstimo |
| createdAt   | date    | Data de cadastro no acervo    |

### Emprestimo
| Campo       | Tipo    | Descrição                     |
|-------------|---------|-------------------------------|
| id          | string  | Identificador único (UUID)    |
| usuarioId   | string  | Referência ao Usuario         |
| livroId     | string  | Referência ao Livro           |
| dataEmprestimo | date | Data do empréstimo            |
| dataDevolucao  | date | Data de devolução (null se ativo) |
| status      | string  | `"ativo"` ou `"devolvido"`    |

---

## Relacionamento entre Entidades

```
Usuario (1) ──────────── (N) Emprestimo
Livro   (1) ──────────── (N) Emprestimo

- Um usuário pode ter vários empréstimos ao longo do tempo
- Um livro pode ter vários empréstimos (histórico), mas apenas um ativo por vez
- O Emprestimo é a entidade de junção entre Usuario e Livro
```
