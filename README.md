# Backend - Projeto Din-Din

### Exercicío de encerramento do Módulo 3 do curso de Desenvolvimento de Software da *Cubos Academy*

## Para executar este projeto localmente usando o npm, siga os seguintes passos:

* Certifique-se de ter o Node.js e o npm instalados em sua máquina.
* Faça o download ou clone o projeto do repositório.
* Abra o terminal e navegue até a pasta raiz do projeto.
* Execute o comando npm install para instalar todas as dependências do projeto.
* O arquivo `dump.sql` está disponível para que o banco de dados seja criado em qualquer aplicação, recomendo o `postgress` que foi o utilizado no desenvolvimento deste projeto.
* Certifique-se de ter uma conexão com o banco de dados configurada corretamente no arquivo conexao.js.
* Execute o comando npm start para iniciar o servidor.
* Abra o seu navegador e acesse http://localhost:3000 para visualizar a aplicação em execução.
* O número da porta pode variar dependendo da configuração do projeto e você pode conferir no arquivo `src/index.js`. 

# Feito isso, basta seguir os seguintes passos:

## **Cadastrar usuário**
#### `POST` `/usuario`

Esta rota é responsável por cadastrar um novo usuário em um banco de dados. O cadastro é feito através de uma requisição HTTP POST com as informações do usuário no corpo da requisição.

O código utiliza a biblioteca bcrypt para criptografar a senha do usuário antes de ser armazenada no banco de dados e a biblioteca jwt para gerar um token de autenticação.

#### **Exemplo de requisição**

```javascript
{
    "nome": "Sam",
    "email": "sam@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "Sam",
    "email": "sam@email.com"
}
```

```javascript
{
     "Já existe usuário cadastrado com o e-mail informado."
}
```

## **Login do usuário**
#### `POST` `/login`

A função realiza a autenticação de usuários através de suas credenciais. A função recebe uma requisição HTTP contendo as informações de `e-mail e senha do usuário` e, a partir desses dados, verifica se o usuário existe e se a senha informada é válida. Se a autenticação for bem sucedida, é gerado um token JWT que será utilizado nas requisições subsequentes.

#### **Exemplo de requisição**

```javascript
{
    "email": "sam@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "Sam",
        "email": "sam@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
{
    "Usuário e/ou senha inválido(s)."
}
```
## **Criptografar Senha**

A função `criptografarSenha` é responsável por receber uma senha em texto plano e criptografá-la utilizando a biblioteca bcrypt.

## **Detalhar usuário**

#### `GET` `/usuario`

Essa rota será chamada para obter os dados do perfil logado.

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no body
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "Sam",
    "email": "sam@email.com"
}
```

```javascript
{
    "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```
### **Atualizar usuário**

#### `PUT` `/usuario`

Esta função é responsável por atualizar as informações de um usuário cadastrado na aplicação. Recebe os dados do usuário através do corpo da requisição 

#### **Exemplo de requisição**

```javascript
{
    "nome": "Sam",
    "email": "sam@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no body
```

```javascript
{
    "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Listar categorias**

#### `GET` `/categoria`


Este código é responsável por listar todas as categorias cadastradas na aplicação. 

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no body
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
[]
```

# Pessoa B
### **Listar transações do usuário logado**

#### `GET` `/transacao`

Este código é responsável por listar as transações realizadas pelo usuário.

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no body
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
[]

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Esta rota é responsável pelo detalhamento de uma transação usando como parâmetro o `id` passado na query.

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no body
```

#### **Exemplos de resposta**

```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
    "Transação não encontrada."
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Este código é responsável por cadastrar uma nova transação na aplicação. Ele recebe informações sobre a transação através do objeto req.body e o id do usuário através do objeto req.usuario.

#### **Exemplo de requisição**

```javascript
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
   "Todos os campos obrigatórios devem ser informados."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Este código implementa uma função para excluir uma transação específica do banco de dados.

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no body
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "Transação não encontrada."
}
```

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Este código implementa a funcionalidade de extrato de transações, que retorna para o usuário o saldo de entrada e saída das suas transações registradas no sistema.

#### **Exemplo de requisição**

```javascript
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
 "entrada": 300000,
 "saida": 15800
}
```
<h3 align="left">Conecte-se comigo:</h3>
<p align="left">
<a href="https://linkedin.com/in/https://www.linkedin.com/in/samuel-oliveira-45398b1a6/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com/in/samuel-oliveira-45398b1a6/" height="30" width="40" /></a>
</p>

<h3 align="left">Linguagens e ferramentas utilizadas:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> </p>

