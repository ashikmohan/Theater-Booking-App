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
const storage = multer.memoryStorage();

const upload=multer({storage:storage})



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

router.post('/addmovies',upload.single('image'),async(req,res)=>{
    try {
        const {
            moviename,
            category,
            languages,
            cast,
            description,
            rates,
            seats,
        } = req.body;

        // Create a new instance of the Mongoose model
        const movie = new AddmoviesSchema({
            moviename,
            category,
            languages,
            cast,
            description,
            rates,
            seats,
            image: {
                data: Buffer.from(req.file.buffer) , // Store the image data as binary
                contentType: req.file.mimetype, // Store the content type
            },
        });

        // Save the movie data to MongoDB
        await movie.save();

        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        console.error('Error adding movie:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// fetch the data to dashboard
router.get('/moviefetched',async (req,res)=>{
    try{
        const movies=await AddmoviesSchema.find();
        res.status(200).json(movies);
    }catch(err){
        res.status(500).json({error:'Failed to fetch image'});
    }
});

// get the movie details by id
// Route to fetch movie details by ID

router.get('/moviedetails/:id', async (req, res) => {
    try {
      let id = req.params.id;
      let data = await AddmoviesSchema.findById(id);
      res.set('Cache-Control', 'no-store');
      console.log(data);
      res.json({ data: data, status: 200 }).status(200);
    } catch (error) {
      res.status(400).json({ message: 'GET request CANNOT be completed' });
    }
  });
  



module.exports=router;