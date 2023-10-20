const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Servir arquivos estáticos (CSS, imagens, etc.)


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


app.get("/login", (req, res) => {
  const loginPath = path.join(__dirname, 'login.html');
  res.sendFile(loginPath);
});

// Rota de login
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

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});
