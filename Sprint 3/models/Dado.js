const db = require('./db');

const Dado = db.sequelize.define('dados', {
    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    number: {
        type: db.Sequelize.INTEGER
    },
    password: {
        type: db.Sequelize.STRING
    },
    Confirmpassword: {
        type: db.Sequelize.STRING
    }
});

// Sincronize o modelo com o banco de dados
Dado.sync({ force: false }) // O parâmetro force define se a tabela deve ser recriada (true) ou não (false)
    .then(() => {
        console.log('Tabela criada (ou atualizada) com sucesso!');
    })
    .catch((err) => {
        console.error('Erro ao criar tabela:', err);
    });

module.exports = Dado;
