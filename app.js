const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const app=express();
const urlencodeParser=bodyParser.urlencoded({extended:false});
const sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '1801',
    port:3306
});
sql.query("use nodejs");

//Template Engine
app.engine("handlebars",handlebars({ defaultLayout:'main'}));
app.set('view engine','handlebars');

//Routes and Templates

app.get("/",function(req,res){
   /*  res.send('Teste'); */
   /* res.sendFile(__dirname+"/index.html") */
   /* console.log(req.params.id); */
   res.render('index');
});
app.get('/script',function(req,res){
    res.sendFile(__dirname+'/js/script.js')
});
app.get('/style',function(req,res){
    res.sendFile(__dirname+'/css/style.css')
});
app.get('/inserir',function(req,res){
    res.render('inserir');
})
app.get('/select/:id?',function(req,res){
    if(!req.params.id){
        sql.query("select * from user order by id asc",function(err,results,fields){
            res.render('select',{data:results});
        });
    }
});

app.post('/controllerForm',urlencodeParser,function(req,res){
    sql.query("insert into user values (?,?,?)",[req.body.id, req.body.name,req.body.age]);
    res.render('controllerForm');
});


//Start server

app.listen(3000,function(req,res) {
    console.log('Servidor esta rodando!');
    
});

