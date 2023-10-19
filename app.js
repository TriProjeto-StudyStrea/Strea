const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Dado = require('./models/Dado');

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // Servir arquivos estáticos (CSS, imagens, etc.)

app.get("/continue-button", (req, res) => {
    const formularioPath = path.join(__dirname, 'index.html');
    res.sendFile(formularioPath);
});

app.post("/continue-button", function (req, res) {
    const { firstname, lastname, email, number, password, Confirmpassword } = req.body;

    // Verificação de campos vazios
    if (!firstname || !lastname || !email || !number || !password || !Confirmpassword) {
        res.send("<script>alert('Por favor, preencha todos os campos.');</script>");
        return;
    }

    // Verificação de correspondência de senha
    if (password !== Confirmpassword) {
        res.send("<script>alert('As senhas não correspondem. Por favor, tente novamente.');</script>");
        return;
    }

    // Criação do Dado se todas as validações forem bem-sucedidas
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

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});