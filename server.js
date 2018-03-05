const db = require('./db');
const models=db.models;
const Employee = models.Employee;
const {Job} =db.models;
const express =require('express');
const app=express();

const nunjucks = require('nunjucks');
nunjucks.configure({noCache:true});
app.use(require('body-parser').urlencoded());
app.set('view engine','html');
app.engine('html',nunjucks.render);
app.use(require('method-override')('_method'))

db.sync()
.then(()=>db.seed());

app.get('/employees',(req,res,next)=>{
    Promise.all([
        Employee.findAll({
            include:[Job,
                    {model:Employee, as:'manager'},
                    {model:Employee, as:'manages'}
            ]
        }),
        Job.findAll({})
    ])
    .then(([employees,jobs]) =>res.render('employees',{employees,jobs}))
    .catch(next)
})

app.post('/employees',(req,res,next)=>{
    Employee.createFromForm(req.body)
    .then(()=>res.redirect('/employees'))
    .catch(next)
})

app.patch('/employees/:id',(req,res,next)=>{
    Employee.findById(req.params.id)
    .then(employee=>{
        employee.email=req.body.email;
        employee.managerId=req.body.managerId;
        return employee.save();
    })
    .then(()=>res.redirect('/employees'))
    .catch(next)
})


const port =process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listen on port ${port}`))




