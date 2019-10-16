var mongoose = require('mongoose');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var express = require('express');
const bcrypt = require('bcryptjs');
var app= express();
var User = require('./model/model');
var config= require('./config.db/config');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

mongoose.connect(config.url,{useNewUrlParser:true, useUnifiedTopology: true }
    ).then(
        ()=>{
            console.log(" Succeessfully connected to Database");
        }
    ).catch(
        err=>{
            console.log("Error occures due to ",err);
            process.exit();
        }
    );

    app.get('/api/connect',(req,res)=>
    {
         res.send("connected");
    
    });

    app.get('/api/get/:id',(res,req)=>
    {
        User.findById($.req.body.id).then(data=>
            {
                res.send(data)
            });
    });

app.get('/api/getdetails',(req,res)=>
{
     User.find().then(data=>{
         res.send(data);
     }

     ).catch(err =>
        {
            res.status(500).send(" Error while retreiving data");
        });  
});

app.delete('/api/delete/:Empid',(req,res)=>
{
     User.findOneAndRemove({Empid:req.params.Empid}).then(data=>
        {
            res.send(data);
        }).catch(err=>
            {
                res.send("Data not found");
            });
});

app.put('/api/putdetails/:Empid',(req,res)=>
{
    
    User.findOneAndUpdate(req.params.Empid,req.body).then(data=>
    {
        if(!data)
        {
           console.log("Data Updated");
            res.status(500).send("Error in first");
        }
        res.status(200).send(data);
    }).catch(err=>
        {
          console.log("Data error");
          res.status(500).send("Error in second");
    });
});

app.post('/api/addUser',(req,res)=>
{
  var obj = new User();
   obj.Name=req.body.Name;
   obj.Empid=req.body.Empid;
   obj.Role=req.body.Role;
   obj.Gender=req.body.Gender;
   obj.Email=req.body.Email;
   obj.phone=req.body.phone;
   obj.Password=req.body.Password;
   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(obj.Password, salt, (err, hash) => {
      if (err) throw err;
      obj.Password = hash;
   obj.save().then(data=>
    {
        res.send(data);
    }).catch(err=>
        {
            res.status(500).send("Error while Posting Data",err);
        });
    });
   });
});
app.listen(4550);
console.log("Server listening to port 4550")
