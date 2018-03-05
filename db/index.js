
const conn =require('./conn')

const Employee=require('./Employee')
const Job=require('./Job');



Employee.belongsTo(Job);
Job.hasMany(Employee);
Employee.belongsTo(Employee,{as:'manager'});
Employee.hasMany(Employee,{as:'manages',foreignKey:'managerId'})

const sync =()=>{
    return conn.sync({force:true});
}

const seed =()=>{
    return Promise.all([
        Job.create({name:'Jr. Dev'}),
        Job.create({name:'Sr. Dev'}),
        Job.create({name:'Manager'}),
        Employee.create({email: 'moe@gmail.com'}),
        Employee.create({email: 'larry@gmail.com'}),
        Employee.create({email: 'curly@gmail.com'}),
        Employee.create({email: 'jeremy_one@gmail.com'}),
        Employee.create({email: 'jeremy_two@gmail.com'}),
    ])
    .then(([jrDev,srDev,manager,moe,larry,curly,jeremy_one,jeremy_two])=>{
        return Promise.all([
            moe.setJob(manager),
            larry.setJob(manager),
            curly.setJob(jrDev),
            jeremy_one.setJob(srDev),
            jeremy_two.setJob(srDev),
            curly.setManager(larry),
            larry.setManager(moe),
        ])
    // .then(()=>{
    //     return Job.findOne({
    //         where:{name:'Sr. Dev'},
    //         include:[Employee]
    //     })
    // })
    // .then(job=>{
    //     console.log(job.employees.map(function (employee){
    //         return employee.email}).join(',') //why here 'employee =>employee.email'
    
    // )
    // })
    })
}
module.exports={
    sync,
    seed,
    models:{
        Employee,
        Job
    }

}