# Recipe Hub - Catálogo de Receitas com Autenticação

Este projeto foi desenvolvido como parte de uma etapa seletiva com o objetivo de criar uma aplicação para gestão de receitas de cozinha. A aplicação inclui autenticação de usuários e fornece uma API back-end construída em **NestJS**, conectada a um banco de dados **PostgreSQL**.




## 🧾 Funcionalidades Principais

- **Cadastro e autenticação de usuários**:
  - Registro de usuários com nome único.
  - Login com autenticação via **JWT**.
  - Senhas armazenadas de forma segura com **hashing** usando **bcrypt**.
- **Gestão de receitas**:
  - Criação, atualização e exclusão lógica (soft delete) de receitas.
  - Listagem de receitas com filtros por categoria, busca por palavras-chave e paginação.
  - Detalhamento e busca de receitas por ID ou por usuário.
- **Validação de dados**:
  - Implementada no back-end utilizando **DTOs** e validações padrão do NestJS.


## 🗂 Estrutura do Projeto

A estrutura do projeto foi organizada de forma modular para facilitar a manutenção e a escalabilidade.

```
recipe-hub
├── src
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │
│   ├── recipe
│   │   ├── dto
│   │   │   ├── create-recipe.dto.ts
│   │   │   ├── update-recipe.dto.ts
│   │   ├── recipe.controller.ts
│   │   ├── recipe.module.ts
│   │   ├── recipe.service.ts
│   │   ├── recipe.entity.ts
│   │
│   ├── user
│   │   ├── dto
│   │   │   ├── create-user.dto.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.entity.ts
│   │
│   ├── app.module.ts
│   ├── main.ts
├── test
```

## ⚙️ Configuração do Projeto

### Banco de Dados
- **Banco de Dados:** PostgreSQL
- **Entidades:** `User`, `Recipe`
- **Relacionamentos:** 
  - **User** possui um relacionamento One-to-Many com **Recipe** (um usuário pode criar várias receitas).
  - **Recipe** tem um campo `createdBy` que referencia o usuário criador.

### Autenticação
- **Tecnologia:** JWT (JSON Web Tokens)
- **Guarda de Autenticação:** `AuthGuard` utilizando JWT.
- **Senha:** Armazenada em formato hash usando `bcrypt`.

### Validação de Dados
- **DTOs (Data Transfer Objects):** 
  - Utilizados para validar e transferir dados entre as camadas do sistema.
  - As entradas de dados para criação e atualização de usuários e receitas são validadas com DTOs no backend.

### Arquitetura
- **Backend:** NestJS
- **Estrutura Modular:**
  - Módulos separados para `auth`, `recipe`, `user`.
  - Serviços responsáveis pela lógica de negócios.
  - Controllers responsáveis pelas rotas da API.

### Documentação da API
- **Swagger:** A documentação da API foi gerada automaticamente utilizando o Swagger.



## Documentação das Rotas da API

### Requisitos de Autenticação

- Todas as rotas do caminho `/recipes` exigem autenticação via **JWT**.
- Para autenticar, o usuário deve:
  1. Registrar-se através da rota `/auth/register`.
  2. Realizar login na rota `/auth/login` para obter um **accessToken**.
  3. Utilizar o token retornado no cabeçalho `Authorization` em requisições autenticadas:  
     ```
     Authorization: Bearer <accessToken>
     ```

---

### Rotas de Receitas (`/recipes`)

| Método  | URL                        | Descrição                               | Parâmetros                                                                                  | Body                                                                                                                                                                   | Respostas              | Tags      |
|---------|----------------------------|-----------------------------------------|--------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|-----------|
| `GET`   | `/recipes`                 | Retorna todas as receitas com filtros  | `category` (query, opcional), `page` (query, opcional), `limit` (query, opcional), `search` (query, opcional)                     | -                                                                                                                                                                     | `200`: Lista de receitas | `recipes` |
| `POST`  | `/recipes`                 | Cria uma nova receita                   | -                                                                                          | ```json {"name": "string","ingredients": ["string"],"preparationMethod": "string","image": "string (opcional)","category": "number"}```                                 | `201`: Receita criada     | `recipes` |
| `GET`   | `/recipes/{id}`            | Retorna os detalhes de uma receita      | `id` (path, obrigatório)                                                                   | -                                                                                                                                                                     | `200`: Detalhes da receita | `recipes` |
| `PATCH` | `/recipes/{id}`            | Atualiza os dados de uma receita        | `id` (path, obrigatório)                                                                   | ```json {"name": "string (opcional)","ingredients": ["string (opcional)"],"preparationMethod": "string (opcional)","image": "string (opcional)","category": "number (opcional)"}``` | `200`: Receita atualizada | `recipes` |
| `DELETE`| `/recipes/{id}`            | Exclui logicamente uma receita          | `id` (path, obrigatório)                                                                   | -                                                                                                                                                                     | `200`: Receita excluída   | `recipes` |
| `GET`   | `/recipes/user/{userId}`   | Retorna receitas criadas por um usuário | `userId` (path, obrigatório)                                                               | -                                                                                                                                                                     | `200`: Lista de receitas do usuário | `recipes` |

---

### Rotas de Autenticação (`/auth`)

| Método  | URL             | Descrição                     | Parâmetros | Body                                                                                                 | Respostas                  | Tags    |
|---------|-----------------|-------------------------------|------------|-----------------------------------------------------------------------------------------------------|----------------------------|---------|
| `POST`  | `/auth/register`| Registra um novo usuário      | -          | ```json {"username": "string (mínimo 4, máximo 20 caracteres)","password": "string (mínimo 6 caracteres)"}``` | `201`: Usuário registrado | `auth`  |
| `POST`  | `/auth/login`   | Realiza login de um usuário   | -          | ```json {"username": "string","password": "string"}```                                              | `201`: `{ accessToken, userId }` | `auth` |

---

## Entidades e DTOs

### Entidade Recipe

| Propriedade        | Tipo         | Descrição                          | Obrigatório | Restrições                             |
|--------------------|--------------|------------------------------------|-------------|----------------------------------------|
| id                 | string (UUID)| Identificador único da receita     | Sim         | Gerado automaticamente                |
| name               | string       | Nome da receita                    | Sim         |                                        |
| ingredients        | string[]     | Ingredientes da receita            | Sim         | Mínimo de 1 item                       |
| preparationMethod  | string       | Método de preparo da receita       | Sim         |                                        |
| rating             | float        | Avaliação da receita               | Não         | Valor padrão: 0                        |
| numberOfRatings    | int          | Número de avaliações               | Não         | Valor padrão: 0                        |
| image              | string       | Imagem da receita                  | Não         |                                        |
| category           | int          | Categoria da receita               | Sim         | Valor padrão: 0                        |
| createdBy          | User         | Usuário que criou a receita        | Sim         | Relacionamento Many-to-One             |
| deletedAt          | Date         | Data de exclusão lógica (soft-delete) | Não         | Valor gerado automaticamente          |

---

### Entidade User

| Propriedade        | Tipo         | Descrição                          | Obrigatório | Restrições                             |
|--------------------|--------------|------------------------------------|-------------|----------------------------------------|
| id                 | string (UUID)| Identificador único do usuário     | Sim         | Gerado automaticamente                |
| username           | string       | Nome de usuário                    | Sim         | Único, 4-20 caracteres                |
| password           | string       | Senha do usuário                   | Sim         | Mínimo de 6 caracteres                 |
| recipes            | Recipe[]     | Receitas criadas pelo usuário      | Sim         | Relacionamento One-to-Many             |
