# Backend - Projeto Din-Din

### Exercicío de encerramento do Módulo 3 do curso de Desenvolvimento de Software da *Cubos Academy*

## Para executar este projeto localmente usando o npm, siga os seguintes passos:

* Certifique-se de ter o Node.js e o npm instalados em sua máquina.
* Faça o download ou clone o projeto do repositório.
* Abra o terminal e navegue até a pasta raiz do projeto.
* Execute o comando npm install para instalar todas as dependências do projeto.
* Certifique-se de ter uma conexão com o banco de dados configurada corretamente no arquivo conexao.js.
* Execute o comando npm start para iniciar o servidor.
* Abra o seu navegador e acesse http://localhost:3000 para visualizar a aplicação em execução.
* O número da porta pode variar dependendo da configuração do projeto e você pode conferir no arquivo `src/index.js`. 

# Feito isso, basta seguir os seguintes passos:

## **Cadastrar usuário**
#### `POST` `/usuario`

Este código é responsável por cadastrar um novo usuário em um banco de dados. O cadastro é feito através de uma requisição HTTP POST com as informações do usuário no corpo da requisição.

O código utiliza a biblioteca bcrypt para criptografar a senha do usuário antes de ser armazenada no banco de dados e a biblioteca jwt para gerar um token de autenticação.

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "Sam",
    "email": "sam@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "Sam",
    "email": "sam@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
     "Já existe usuário cadastrado com o e-mail informado."
}
```

## **Login do usuário**
#### `POST` `/login`

A função realiza a autenticação de usuários através de suas credenciais. A função recebe uma requisição HTTP contendo as informações de `e-mail e senha do usuário` e, a partir desses dados, verifica se o usuário existe e se a senha informada é válida. Se a autenticação for bem sucedida, é gerado um token JWT que será utilizado nas requisições subsequentes.


<h3 align="left">Conecte-se comigo:</h3>
<p align="left">
<a href="https://linkedin.com/in/https://www.linkedin.com/in/samuel-oliveira-45398b1a6/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com/in/samuel-oliveira-45398b1a6/" height="30" width="40" /></a>
</p>

<h3 align="left">Linguagens e ferramentas utilizadas:</h3>
<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> </p>

