require('dotenv').config()
var express = require('express');
var app = express();
const cors = require("cors")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Schema } = mongoose;
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

mongoose.set('strictQuery', false);
const fs = require('fs');


mongoose.connect('mongodb://127.0.0.1:27017/PhotoApp', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
});
const userModel = mongoose.model(
    'users',
    new Schema({
      name: String,
      email: String,
      password: String
    })
  );



  const checkIfUserExists= async (email) => {
       const user= await userModel.find({email:email})
       if(user){
        return true
       }
       else{
        return false
       }
       
  }

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.post('/signup/auth-signup',async (req,res)=>{
     const formObj = await req.body;
     console.log(formObj);
     const name = formObj.name
     const password = formObj.password
     const email = formObj.email
     console.log(email);
     console.log(password);
     const userExists = await checkIfUserExists(email);
     console.log(userExists);
     if(userExists){
        console.log(`User with email ${email} already exists.`);
     }
     bcrypt
     .genSalt(saltRounds)
     .then(salt => {
       console.log('Salt: ', salt)
       return bcrypt.hash(password, salt)
     })
     .then(hash => {
       console.log('Hash: ', hash)
       const newUser = new userModel({
        name:name,
        email:email,
        password:hash
       })
       newUser.save(function (err, doc) {
        console.log(doc._id);
    });
     })
     .catch(err => console.error(err.message))
        
        // const user = {name:req.body.name, password:hashPassword}
        // users.push(user)
        
   
})
const fetchPassword = async (email,password)=>  { 
    userModel.find({email:email}, function (err,pc) {
        
    let hash=pc[0].password
    console.log(password);
   
     bcrypt.compare(password, hash).then(function(result) {
                pass=result
        });
        
})
}
let pass = false

function authenticateToken(req,res,next) {
  console.log(req.body);
  const authHeader =req.body.headers.Authorization
  const token = authHeader &&   authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)

      req.user = user
      next()
    
  })

}
app.post('/login/auth-login',async (req,res)=> {
    const email = req.body.email
    const password = req.body.password
    const emailExists = await checkIfUserExists(email);
    const user = {email:email}
    if (emailExists){

        const hashPass = await fetchPassword(email,password)
        // console.log(pass);
        // res.send(pass)
        const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        const data = {accessToken:accessToken,pass:pass}
        res.send(data)
       
    }
})



const UserData = mongoose.model(
  'userImages',
  new Schema({
    email:String,
    image:String,
  })
);

app.post('/user-page/upload',authenticateToken,async (req,res)=>{
  const body = req.body
try{
  const newImage = await UserData.create(body)
  newImage.save();
  res.status(201).json({ msg : "New image uploaded...!"})
}catch(error){
  res.status(409).json({ message : error.message })
}
})



app.post("/user-page/show-images",authenticateToken, async (req,res)=>{
        
    UserData.find({},(err,images)=>{
      if (err) {
        return res.status(500).send({ message: 'Error retrieving images' });
    }
    return res.status(200).send(images);
    })
})


app.listen(3001,()=>{
    console.log("The server is running")
})