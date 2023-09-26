const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const secretKey = 'MovieBox';

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const multer = require('multer');
const storage = multer.memoryStorage();

const upload=multer({storage:storage})

const authenticateUser=require('../Auth/auth')

const {usersSignUpData,AddmoviesSchema,Review,Rating,Booking}=require('../model/schema');

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
        const token=jwt.sign({data},secretKey);
        res.status(200).json({token, role:'admin', message: 'Admin Login Successful', api:'/AdminDashboard'})
    }else{
        usersSignUpData.findOne({username,password})
        .then(user=>{
            if(user){
                 const name=user.name;
                 const data={username:username, role:'user'}
                 const token =jwt.sign({data}, secretKey)
                 res.status(200).json({token, role:'user',message:'Login Sucessful', api:'/UserDashboard',user:name});
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
  
// edit the movie details buy admin

router.put("/editdetails/:id",async (req,res)=>{                               
    try{
        let id = req.params.id;
        let updateData = {$set: req.body};

        const updated = await AddmoviesSchema.findByIdAndUpdate(id,updateData);  
        console.log(updated)
        res.set('Cache-Control', 'no-store');                            
        res.json({message:"UPDATE Successful",status:200});                                                                          
    }catch(error){
        res.status(400).json("Cannot /UPDATE data");                            
        console.log(`Cannot POST data`);                               
    }
})

// delete a movie

router.delete("/deletemovies/:id",async (req,res)=>{
    try {
        let id = req.params.id;
        console.log(id);  
        let data = await AddmoviesSchema.findByIdAndRemove(id);
        res.set('Cache-Control', 'no-store');      
        res.json({data:data,status:200}).status(201);
    } catch (error) {
        res.status(400).json({ message: "DELETE request CANNOT be completed" });       
    }
})

router.post('/addreview', async (req, res) => {
    try {
      const { movieId, reviewText } = req.body;
  
      // Check if the movie exists
      const movie = await AddmoviesSchema.findById(movieId);
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Create a new review document
      const review = new Review({
        movieId,
        reviewText,
      });
  
      await review.save();
      res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Add a new route to fetch reviews by movie ID
  router.get('/reviews/:movieId', async (req, res) => {
    try {
      const movieId = req.params.movieId;
  
      // Find all reviews for the specified movie
      const reviews = await Review.find({ movieId });
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 
  
  // book


  // Route to book a ticket
router.post('/bookticket', async (req, res) => {
  try {
    const { movieId,  seat_number } = req.body;

    // Check if the seat is available
    const isSeatAvailable = await checkSeatAvailability(movieId, seat_number);

    if (!isSeatAvailable) {
      return res.status(400).json({ error: 'Seat is not available' });
    }

    // Create a new booking
    const booking = new Booking({
      movieId,
      // username,
      seat_number:seat_number,
      // Add other relevant fields here
    });

    // Save the booking to MongoDB
    await booking.save();

    res.status(201).json({ message: 'Ticket booked successfully' });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to check seat availability
// Function to check seat availability
async function checkSeatAvailability(movieId, seat_number) {
  try {
    // Assuming you have a 'bookings' collection in your MongoDB
    // You can customize this query based on your actual schema
    const booking = await Booking.findOne({ movieId, seat_number });

    // If a booking exists for the specified movie and seat, it's not available
    if (booking) {
      return false;
    }

    // If no booking exists, the seat is available
    return true;
  } catch (error) {
    console.error('Error checking seat availability:', error);
    return false; // Assume the seat is not available in case of an error
  }
}

// Add a new route to fetch booking details by ID
router.get('/booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Fetch the booking details by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports=router;