const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Employee = conn.define('employee',{
    email:{
        type:Sequelize.STRING
    }
},{
    getterMethods:{
        name:function(){
            return this.email.split('@')[0];
        },
        emailProvider:function(){
            return this.email.split('@')[1];
        },
        whoImanage:function(){
            var newarr=[];
            this.manages.forEach(function(employee){
                newarr.push(employee.email)})
            return newarr.join()
        }
    }
})

Employee.createFromForm=function(body){
    if(body.jobId==='-1'){
        delete body.jobId;
    }
    return this.create(body)
}


module.exports=Employee;
