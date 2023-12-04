const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); 

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

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});
