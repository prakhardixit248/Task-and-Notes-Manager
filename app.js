const express = require('express');

const Sequelize=require('sequelize');
var bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db=new Sequelize({
    dialect: 'sqlite' ,
    storage: __dirname+'/test.db'
})

n =  new Date();
y = n.getFullYear();
m = n.getMonth();
d = n.getDate()+ 1;
date= d + "/" + m + "/" + y;

const Tasks=db.define('task',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement :true
    },
    title:{
        type:Sequelize.STRING(40),
        allowNull:false
    },
    description:{
        type:Sequelize.STRING(100),
        allowNull:true
    },
    duedate:{
        type:Sequelize.STRING,
        defaultValue:date
    },
    status:{
        type:Sequelize.STRING(40),
        defaultValue:"incomplete"
    },
    priority:{
        type:Sequelize.STRING(40),
        defaultValue:"medium"
    }
}, {
    timestamps: false
  })

  db.sync();

app.get('/todos',(req,res)=>
{
    Tasks.findAll().then((task)=>{
        console.log(task);
        res.send(task);
        });;
})

app.post('/todos',(req,res)=>
{
    db.sync().then(()=>{
     Tasks.create({
         title:req.body.taskname,
         description:req.body.description,
        }).then((task)=> 
        {
            //console.log(req.params);
        // you can now access the newly created user
        res.send(task.dataValues);
        }).catch(function(err)
         {
        // print the error details
        console.log(err);
    });})
})

app.get('/todos/:id',(req,res)=>{
 Tasks.findOne({
    where: {
        id:parseInt(req.params.id)
    }
}).then((task)=>{
console.log(task.dataValues);
res.send(task.dataValues);
});
})

app.patch('/todos/:id',(req,res)=>
{
    Tasks.update({
    title:"exercise updated",
    description:"stay healthy updated",
    duedate:"02-30-2020"
   },
   {
       where:{id:parseInt(req.params.id)
    }}).catch((err)=>
    {
        console.log(err)
    })
})

app.get('/todos/4/notes',()=>{

})

app.post('/todos/4/notes',()=>
{
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.listen(3030);