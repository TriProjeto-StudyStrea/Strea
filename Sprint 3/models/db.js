const Sequelize=require('sequelize');

const sequelize=new Sequelize("cadastro","root","123estudar",{
    host:'localhost',
    dialect:'mysql'
});
module.exports={
    Sequelize : Sequelize,
    sequelize: sequelize
}