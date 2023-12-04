const db = require ('./db')

const Dado= db.sequelize.define('dados',{
    firstname: {
        type: db.Sequelize.STRING
    },
    lastname: {
        type:db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    number:{
        type: db.Sequelize.INTEGER
    },
    password:{
        type: db.Sequelize.STRING
    },
    Confirmpassword:{
        type: db.Sequelize.STRING
    }

})

module.exports= Dado