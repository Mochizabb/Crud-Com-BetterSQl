# CRUD API - Gerenciamento de Usuários

Uma API REST simples para gerenciamento de usuários usando Node.js, Express e SQLite.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Better-SQLite3** - Banco de dados SQLite
- **JavaScript ES6+** - Linguagem de programação

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd crud-api
```

2. Instale as dependências:
```bash
npm install express better-sqlite3
```

3. Execute o projeto:
```bash
node app.js
```

A API estará rodando em `http://localhost:3030`

## 🛠️ Funcionalidades

### ✅ CRUD Completo
- **CREATE** - Criar novo usuário
- **READ** - Listar todos os usuários
- **UPDATE** - Atualizar usuário (total ou parcial)
- **DELETE** - Deletar usuário específico

### 🔧 Funcionalidades Extras
- Criar/recriar tabela do banco
- Deletar toda a tabela
- Update seletivo (altera apenas campos enviados)

## 📍 Endpoints

### 📝 Criar Usuário
```http
POST /
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com", 
  "password": "123456"
}
```

### 👥 Listar Usuários
```http
GET /usuarios
```

### ✏️ Atualizar Usuário
```http
PUT /usuarios/:id
Content-Type: application/json

{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "password": "nova123"
}
```
> **Nota:** Todos os campos são opcionais. Apenas os campos enviados serão atualizados.

### 🗑️ Deletar Usuário
```http
DELETE /usuarios/:id
```

### 🔄 Recriar Banco
```http
POST /createAgain
```

### ❌ Deletar Banco
```http
DELETE /deleteAll
```

## 📊 Estrutura do Banco

```sql
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
```

## 📋 Exemplos de Uso

### Criar usuário:
```json
{
  "name": "Maria Santos",
  "email": "maria@exemplo.com",
  "password": "senha123"
}
```

### Update parcial (apenas nome):
```json
{
  "name": "Maria Silva"
}
```

### Update múltiplos campos:
```json
{
  "email": "maria.silva@exemplo.com",
  "password": "novasenha456"
}
```

## ⚡ Características Técnicas

- **Prepared Statements** - Proteção contra SQL Injection
- **Update Seletivo** - Atualiza apenas campos fornecidos
- **Tratamento de Erros** - Try/catch em todas as rotas
- **Status Codes** - Códigos HTTP apropriados
- **Validação** - Campos obrigatórios validados

## 🎯 Status Codes

- `200` - Sucesso (GET, PUT, DELETE)
- `201` - Criado com sucesso (POST)
- `400` - Dados inválidos ou ausentes
- `404` - Usuário não encontrado
- `500` - Erro interno do servidor

## 🧪 Testando a API

Recomendado usar:
- **Thunder Client** (VS Code)
- **Postman**
- **Insomnia**
- **cURL**

### Exemplo com cURL:
```bash
# Criar usuário
curl -X POST http://localhost:3030/ \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@email.com","password":"123456"}'

# Listar usuários
curl http://localhost:3030/usuarios

# Atualizar usuário
curl -X PUT http://localhost:3030/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva"}'
```

## 📁 Estrutura do Projeto

```
CRUD/
├── app.js                 # Arquivo principal
├── database/
│   └── .gitkeep          # Pasta vazia (opcional)
├── package.json          # Dependências e scripts
├── package-lock.json     # Lockfile das dependências
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Documentação
```

## 🚧 Possíveis Melhorias

- [ ] Hash de senhas com bcrypt
- [ ] Autenticação JWT
- [ ] Paginação na listagem
- [ ] Validação de formato de email
- [ ] Logs estruturados
- [ ] Testes automatizados
- [ ] Variáveis de ambiente

## 👨‍💻 Autor
**[Carlos Daniel](https://github.com/Mochizabb)** - *Desenvolvedor em formação*

Desenvolvido como projeto de estudo para aprender:
- CRUD operations
- Express.js
- SQLite com Better-SQLite3
- RESTful APIs
- JavaScript ES6+

---

⭐ **Dica**: Este projeto demonstra conceitos fundamentais de desenvolvimento backend com Node.js!