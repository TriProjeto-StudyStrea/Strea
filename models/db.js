const Sequelize=require('sequelize');

const sequelize=new Sequelize("cadastro","root","estudar123!",{
    host:'localhost',
    dialect:'mysql'
});
module.exports={
    Sequelize : Sequelize,
    sequelize: sequelize
}
