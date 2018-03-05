const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Job = conn.define('job',{
    name:{
        type:Sequelize.STRING
    }
})

module.exports=Job;
