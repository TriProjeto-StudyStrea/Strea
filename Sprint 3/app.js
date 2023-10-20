const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Dado = require ('./models/Dado')

const app = express();
const PORT = 8083;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));  // Servir arquivos estáticos (CSS, imagens, etc.)


app.get("/continue-button", (req, res) => {
    const formularioPath = path.join(__dirname, 'index.html' );
    res.sendFile(formularioPath);
});


app.post("/continue-button", function(req, res) {
    Dado.create({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        Confirmpassword: req.body.Confirmpassword,
    

    }).then(function(){
        res.send("Cadastro realizado com sucesso")

    }).catch(function(erro){
        res.send("Ocorreu um erro:" + erro)


    })

   
   
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: http://localhost:${PORT}`);
});

