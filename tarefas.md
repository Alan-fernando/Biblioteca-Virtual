# Quebra de Tarefas da Equipe

## Divisão Inicial das Tarefas

### Integrante 1 — Responsável: Autenticação e Usuários
- Configuração inicial do projeto (Express, sessões, estrutura de pastas)
- Implementação do sistema de sessões (`express-session`)
- Telas e rotas de login e cadastro
- `authController`, `authService`, `usuarioRepository`
- `authMiddleware` e `adminMiddleware`
- Tela de perfil do usuário

### Integrante 2 — Responsável: Módulo de Livros
- CRUD completo de livros (criar, editar, listar, deletar)
- `livroController`, `livroService`, `livroRepository`
- Telas: listagem pública, detalhe do livro, formulário criar/editar
- Persistência em arquivo JSON (`livros.json`)
- Barra de pesquisa por título, autor e categoria

### Integrante 3 — Responsável: Empréstimos e Painel Admin
- Módulo de empréstimos e devoluções
- `emprestimoController`, `emprestimoService`, `emprestimoRepository`
- Tela de "Meus Empréstimos" (área do leitor)
- Painel administrativo: listagem de todos os empréstimos
- Integração entre módulo de livros e empréstimos (disponibilidade)

### Integrante 4 — Responsável: Frontend e Integração
- Desenvolvimento do CSS (estilização completa)
- Padronização das views (layout base, header, footer)
- Telas de erro (404, acesso negado)
- Integração final das rotas e testes de navegação
- Documentação técnica (README)

> **Nota:** Em grupos menores, as responsabilidades devem ser redistribuídas entre os integrantes disponíveis.

---

## Responsabilidades de Cada Integrante

| Integrante | Área Principal              | Entregas                                             |
|------------|-----------------------------|------------------------------------------------------|
| 1          | Autenticação / Sessões       | Login, cadastro, sessões, middlewares de auth        |
| 2          | Módulo Livros                | CRUD livros, listagem pública, busca                 |
| 3          | Empréstimos / Admin          | Empréstimos, devoluções, painel administrativo       |
| 4          | Frontend / Integração        | CSS, views, rotas, testes, documentação              |

---

## Cronograma Simples

| Semana | Atividade                                                      | Responsável   |
|--------|----------------------------------------------------------------|---------------|
| 1      | Planejamento: definição de rotas, entidades e protótipos       | Todos         |
| 1      | Entrega da Etapa 1 (pasta Planejamento no repositório)         | Todos         |
| 2      | Configuração do projeto, Express, sessões, estrutura inicial   | Integrante 1  |
| 2      | Início do módulo de livros (CRUD + JSON)                       | Integrante 2  |
| 3      | Autenticação completa (login, cadastro, middleware)            | Integrante 1  |
| 3      | Módulo de livros finalizado (telas + rotas)                    | Integrante 2  |
| 3      | Início do módulo de empréstimos                                | Integrante 3  |
| 4      | Módulo de empréstimos finalizado + painel admin                | Integrante 3  |
| 4      | CSS e padronização de views                                    | Integrante 4  |
| 5      | Integração de todos os módulos, testes                         | Todos         |
| 5      | Correções, ajustes finais                                      | Todos         |
| 6      | Entrega da Etapa 2 + apresentação                              | Todos         |
