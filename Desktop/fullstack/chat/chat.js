const express = require("express");
const port = 8080 ;
const app = express();
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
app.set("view engine" , "ejs");
const path = require('path');
app.set("views" , path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/javascript")));
app.use(express.urlencoded({extended:true}));
var methodOverride = require('method-override');
app.use(methodOverride('_method'))
uuidv4();
app.listen(port , ()=>{
    console.log("Connection Establish with the port 8080");
})
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'user',
    password:"Nikhil@221314"
});

app.get("/user" , (req,res)=>{
    q = 'select * from chat';
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err ;
            datas = result;
            res.render("new.ejs" , {datas});
        })
    }catch(err){
        console.log(err);
    }
})
app.get("/chat/new" , (req,res)=>{
    res.render("form.ejs");
})
app.post("/chat/new"  , (req,res)=>{
    let{sender , reciever , message} = req.body;
    let data = [uuidv4() , sender , reciever , message];
    let q = "insert into chat(id , sender , reciever , message) values (?,?,?,?)";
    try{
        connection.query(q,data , (err,result)=>{
            if(err) throw err ;
            console.log("data saved successfull");
            res.redirect("/user");
        })
    }catch(err){
        console.log(err);
    }
})
app.get("/chat/edit/:id" , (req,res)=>{
    let {id}  = req.params ;
    q = `select * from chat where id = '${id}'`;
    try{
        connection.query(q, (err,result)=>{
            if(err) throw err ;
            data = result;
            res.render("newfrom.ejs" , {data});
        })
    }catch(err){
        console.log(err);
    }
});
app.patch("/chat/new/edit/:id" , (req,res)=>{
    let {id} = req.params;
    let{newmessage} = req.body;
    q = `update chat set message = '${newmessage}' where id = '${id}'`;
    try{
        connection.query(q , (err,result)=>{
            if(err) throw err;
            console.log("data update successfully");
            res.redirect("/user");
        })
    }catch(err){
        console.log("error occured");
    }

})
app.delete("/chat/:id/remove" , (req,res)=>{
    let{id} = req.params ;
    q = `delete from chat where id = '${id}'`;
    try{
        connection.query(q , (err,result)=>{
            if(err) throw err;
            res.redirect("/user");
        })
    }catch(err){
        console.log("error occured");
    }
})