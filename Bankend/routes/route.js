const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');



router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const multer = require('multer');
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

const upload = multer({ storage: storage });


const {usersSignUpData,AddmoviesSchema}=require('../model/schema');

// signUp

router.post("/Signup",async (req,res)=>{
    try{
        console.log(req.body);
        const user=req.body;
        const newdata=await usersSignUpData(user);
        newdata.save();
        res.status(200).json({message:"Post Succesful"})
    }catch(error){
        res.status(400).json("cannot Post data")
        console.log(`Cannot post data`)
    }
})

// login

router.post('/login',(req,res)=>{
    const{username,password}=req.body;
    console.log(username,password)
    if(username==="admin@gmail.com" && password==="admin123"){
        const data={username:username,role:"admin"}
        res.status(200).json({message: 'Admin Login Successful', api:'/AdminDashboard'})
    }else{
        usersSignUpData.findOne({username,password})
        .then(user=>{
            if(user){
                 const name=user.name;
                 const data={username:username, role:'user'}
                 res.status(200).json({role:'user',message:'Login Sucessful', api:'/UserDashboard'});
            } else{
                res.status(401).json({error:'Invalid Username or Password'});
            }
        })
        .catch(error=>{
            res.status(500).json({error:error.message});
        });
    }

});

// add movies


module.exports=router;