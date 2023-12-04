const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const Dado = require('./models/Dado'); // Certifique-se de que o caminho para o modelo Dado está correto

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'estudar123!',
  database: 'cadastro',
};

async function connectToDB() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'trilha.html'));
});

app.post('/anotacoes', (req, res) => {
  const noteContent = req.body.note;

  console.log('Anotação Recebida:', noteContent);

  res.send('Anotação recebida com sucesso!');
});

app.get("/continue-button", (req, res) => {
  const formularioPath = path.join(__dirname, 'index.html');
  res.sendFile(formularioPath);
});

app.post("/continue-button", function (req, res) {
  const { firstname, lastname, email, number, password, Confirmpassword } = req.body;

  if (!firstname || !lastname || !email || !number || !password || !Confirmpassword) {
    res.send("<script>alert('Por favor, preencha todos os campos.');</script>");
    return;
  }

  if (password !== Confirmpassword) {
    res.send("<script>alert('As senhas não correspondem. Por favor, tente novamente.');</script>");
    return;
  }

  Dado.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    number: number,
    password: password,
    Confirmpassword: Confirmpassword,
  }).then(function () {
    res.send("<script>alert('Cadastro realizado com sucesso');</script>");
  }).catch(function (erro) {
    res.send("<script>alert('Ocorreu um erro: " + erro + "');</script>");
  });
});

app.get("/login", (req, res) => {
  const loginPath = path.join(__dirname, 'login.html');
  res.sendFile(loginPath);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await connectToDB();

    const [rows, fields] = await connection.execute(
      'SELECT * FROM dados WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length > 0) {
      res.send("<script>alert('Login bem-sucedido');</script>");
    } else {
      res.send("<script>alert('Credenciais inválidas. Por favor, tente novamente.');</script>");
    }

    await connection.end();
  } catch (error) {
    console.error('Ocorreu um erro durante o login:', error);
    res.send("<script>alert('Ocorreu um erro ao fazer login');</script>");
  }
});

app.post('/continue-button/telainicial.html', (req, res) => {
  res.redirect('/telainicial.html');
});

app.get('/telainicial.html', (req, res) => {
  res.sendFile(__dirname + '/telainicial.html');
});

app.get('/CRUD/conteudos.html', (req, res) => {
  res.sendFile(__dirname + '/CRUD/conteudos.html'); 
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/login.html'); 
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




