let express = require('express');
let app = express();
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config()

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/",(req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.use("/name",bodyParser.urlencoded({extended: false}))
app.post("/name",(req,res)=>{

  const firstName = req.body.first;
  const lastName = req.body.last; 

  res.json({ name: `${firstName} ${lastName}` });
});


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/views/index.html");
});

app.get("/now",(req,res,next)=>{
  req.time = new Date().toString();
  next();
},(req,res)=>{
  const opt = {
    time:req.time
  }
  res.json(opt);
});

app.get("/:word/echo",(req,res)=>{
  const obj = {echo: req.params.word};
  res.json(obj);
});

app.get("/json",(req,res)=>{
    let message = "Hello json";
    if(process.env.MESSAGE_STYLE === "uppercase"){
        message = message.toUpperCase();
    }
    const obj = {"message": message};
  res.json(obj);
});

app.get("/name",(req,res)=>{
  const firstName = req.query.first;
  const lastName = req.query.last; 
  res.json({ name: `${firstName} ${lastName}` });
});
































 module.exports = app;
