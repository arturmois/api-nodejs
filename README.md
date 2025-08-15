# API de Cursos - Node.js

Uma API RESTful moderna para gerenciamento de cursos, construída com Fastify, TypeScript, Drizzle ORM e PostgreSQL.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Superset tipado do JavaScript
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de esquemas TypeScript-first
- **Swagger/OpenAPI** - Documentação automática da API

## 📋 Funcionalidades

- ✅ Criar novos cursos
- ✅ Listar todos os cursos
- ✅ Buscar curso por ID
- ✅ Validação automática de dados com Zod
- ✅ Documentação automática com Swagger
- ✅ Logging estruturado com Pino
- ✅ Migrações de banco de dados com Drizzle

## 🏗️ Arquitetura da Aplicação

A aplicação segue uma arquitetura modular com separação clara de responsabilidades:

```
src/
├── database/
│   ├── client.ts      # Configuração do cliente do banco
│   └── schema.ts      # Definição das tabelas
├── routes/
│   ├── create-course.ts    # Rota para criar cursos
│   ├── get-courses.ts      # Rota para listar cursos
│   └── get-course-by-id.ts # Rota para buscar curso por ID
└── server.ts          # Configuração principal do servidor
```

## 📊 Fluxo Principal da Aplicação

```mermaid
graph TD
    A[Cliente HTTP] --> B[Servidor Fastify]
    B --> C{Rota Solicitada}

    C -->|POST /courses| D[Criar Curso]
    C -->|GET /courses| E[Listar Cursos]
    C -->|GET /courses/:id| F[Buscar Curso por ID]

    D --> G[Validar Dados com Zod]
    G --> H[Inserir no PostgreSQL via Drizzle]
    H --> I[Retornar ID do Curso Criado]

    E --> J[Consultar Todos os Cursos]
    J --> K[Retornar Lista de Cursos]

    F --> L[Validar UUID do Parâmetro]
    L --> M[Consultar Curso Específico]
    M --> N{Curso Encontrado?}
    N -->|Sim| O[Retornar Dados do Curso]
    N -->|Não| P[Retornar 404 Not Found]

    I --> Q[Resposta JSON]
    K --> Q
    O --> Q
    P --> Q
    Q --> A

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style D fill:#e8f5e8
    style E fill:#e8f5e8
    style F fill:#e8f5e8
    style Q fill:#fff3e0
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd api-nodejs
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

4. **Execute as migrações do banco de dados:**

```bash
npm run db:generate
npm run db:migrate
```

5. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Endpoints da API

### Criar Curso

```http
POST /courses
Content-Type: application/json

{
  "title": "Nome do Curso"
}
```

**Resposta (201):**

```json
{
  "courseId": "uuid-do-curso-criado"
}
```

### Listar Todos os Cursos

```http
GET /courses
```

**Resposta (200):**

```json
{
  "courses": [
    {
      "id": "uuid-do-curso",
      "title": "Nome do Curso"
    }
  ]
}
```

### Buscar Curso por ID

```http
GET /courses/:id
```

**Resposta (200):**

```json
{
  "course": {
    "id": "uuid-do-curso",
    "title": "Nome do Curso"
  }
}
```

**Resposta (404):**

```
null
```

## 📖 Documentação da API

A documentação interativa da API está disponível em:

- **Desenvolvimento:** `http://localhost:3333/documentation` (Swagger UI)
- **Produção:** `http://localhost:3333/docs` (Scalar API Reference)

## 🗄️ Estrutura do Banco de Dados

### Tabela: courses

| Campo       | Tipo | Descrição                            |
| ----------- | ---- | ------------------------------------ |
| id          | UUID | Identificador único (chave primária) |
| title       | TEXT | Título do curso (obrigatório, único) |
| description | TEXT | Descrição do curso (opcional)        |

### Tabela: users

| Campo | Tipo | Descrição                             |
| ----- | ---- | ------------------------------------- |
| id    | UUID | Identificador único (chave primária)  |
| name  | TEXT | Nome do usuário (obrigatório)         |
| email | TEXT | Email do usuário (obrigatório, único) |

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run db:generate` - Gera as migrações do banco de dados
- `npm run db:migrate` - Executa as migrações pendentes
- `npm run db:studio` - Abre o Drizzle Studio para visualizar o banco

## 🧪 Testando a API

Use o arquivo `requisicoes.http` incluído no projeto para testar os endpoints:

```http
# Criar um novo curso
POST http://localhost:3333/courses
Content-Type: application/json

{
  "title": "Curso de Docker"
}

###

# Listar todos os cursos
GET http://localhost:3333/courses

###

# Buscar curso específico
GET http://localhost:3333/courses/84a2fc12-347e-4883-9a78-1c577362fea7
```

## 🔍 Características Técnicas

- **Validação de Dados:** Utiliza Zod para validação automática de entrada e saída
- **Type Safety:** TypeScript em toda a aplicação para maior segurança de tipos
- **Performance:** Fastify oferece alta performance comparado ao Express
- **Logging:** Pino para logging estruturado e performático
- **ORM Moderno:** Drizzle ORM com queries type-safe
- **Auto-documentação:** Swagger/OpenAPI gerado automaticamente

## 🚀 Próximos Passos

- [ ] Implementar autenticação e autorização
- [ ] Adicionar relacionamento entre usuários e cursos
- [ ] Implementar paginação na listagem de cursos
- [ ] Adicionar testes automatizados
- [ ] Implementar cache com Redis
- [ ] Adicionar upload de imagens para cursos

## 📝 Licença

Este projeto está sob a licença ISC.
