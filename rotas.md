# Definição das Rotas

## Rotas Públicas (sem autenticação)

| Método | Rota                  | Finalidade                                        |
|--------|-----------------------|---------------------------------------------------|
| GET    | `/`                   | Página inicial com listagem de livros em destaque |
| GET    | `/livros`             | Listagem completa do acervo                       |
| GET    | `/livros/busca`       | Pesquisa de livros (query: titulo, autor, categoria) |
| GET    | `/livros/:id`         | Detalhes de um livro específico                   |
| GET    | `/auth/login`         | Exibe formulário de login                         |
| POST   | `/auth/login`         | Processa login e inicia sessão                    |
| GET    | `/auth/cadastro`      | Exibe formulário de cadastro                      |
| POST   | `/auth/cadastro`      | Processa cadastro de novo usuário                 |
| GET    | `/auth/logout`        | Encerra a sessão e redireciona para home          |

---

## Rotas Privadas (requerem autenticação — Leitor ou Admin)

| Método | Rota                         | Finalidade                                       |
|--------|------------------------------|--------------------------------------------------|
| GET    | `/emprestimos/meus`          | Lista os empréstimos do usuário logado           |
| POST   | `/emprestimos`               | Realiza empréstimo de um livro                   |
| POST   | `/emprestimos/:id/devolver`  | Registra devolução de um empréstimo              |
| GET    | `/usuario/perfil`            | Exibe perfil do usuário logado                   |
| POST   | `/usuario/perfil`            | Atualiza dados do perfil (nome, senha)           |

---

## Rotas Privadas Administrativas (requerem autenticação + perfil admin)

| Método | Rota                         | Finalidade                                       |
|--------|------------------------------|--------------------------------------------------|
| GET    | `/admin`                     | Painel administrativo (dashboard)                |
| GET    | `/admin/livros`              | Listagem de todos os livros (gestão)             |
| GET    | `/admin/livros/novo`         | Exibe formulário de cadastro de livro            |
| POST   | `/admin/livros`              | Cria novo livro no acervo                        |
| GET    | `/admin/livros/:id/editar`   | Exibe formulário de edição de livro              |
| POST   | `/admin/livros/:id`          | Atualiza dados de um livro                       |
| POST   | `/admin/livros/:id/deletar`  | Remove livro do acervo                           |
| GET    | `/admin/emprestimos`         | Lista todos os empréstimos ativos do sistema     |
| GET    | `/admin/usuarios`            | Lista todos os usuários cadastrados              |

---

## Rotas de Erro

| Método | Rota           | Finalidade                                        |
|--------|----------------|---------------------------------------------------|
| GET    | `/acesso-negado` | Exibe página de acesso negado (403)             |
| *      | `*`            | Rota catch-all para página 404 (não encontrado)   |

---

## Resumo por Middleware Aplicado

### Sem middleware (públicas)
`GET /`, `GET /livros`, `GET /livros/busca`, `GET /livros/:id`, `GET /auth/login`, `POST /auth/login`, `GET /auth/cadastro`, `POST /auth/cadastro`, `GET /auth/logout`

### Com `authMiddleware` (usuário logado)
`GET /emprestimos/meus`, `POST /emprestimos`, `POST /emprestimos/:id/devolver`, `GET /usuario/perfil`, `POST /usuario/perfil`

### Com `authMiddleware` + `adminMiddleware` (somente admin)
`GET /admin`, `GET /admin/livros`, `GET /admin/livros/novo`, `POST /admin/livros`, `GET /admin/livros/:id/editar`, `POST /admin/livros/:id`, `POST /admin/livros/:id/deletar`, `GET /admin/emprestimos`, `GET /admin/usuarios`
