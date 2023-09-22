const mongoose = require('mongoose');

// signUp Schema

const SignUpSchema=mongoose.Schema({
    name:{
        type:String,                                                         
        required:true
    },
    username:{
        type:String,                                                         
        required:true
    },
    phoneNumber:{
        type:String,                                                         
        required:true
    },
    password:{
        type:String,                                                          
        required:true
    }
})

// add movies

const addMoviesSchema=mongoose.Schema({
    moviename:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum: ['UA','A','PG']
    },
    languages:{
        type:String,
        required:true,
        enum:['Malayalam','Hindi','Tamil','Telugu','English']
    },
    cast:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rates:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    image:{
        data: Buffer, // Store image as binary data
        contentType: String
    },
    
    
})

const reviewSchema = mongoose.Schema({
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies', // Reference the Movie model
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
  });

  const userRatingSchema = mongoose.Schema({
    
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movies', // Reference the Movie model
      required: true,
    },
    rating: {
      type: [],
      required: true,
    },
  });


const MovieBox = mongoose.connection.useDb('MovieBox');

const usersSignUpData =MovieBox.model('MovieBox',SignUpSchema);
const AddmoviesSchema =MovieBox.model('movies',addMoviesSchema);
const Review = MovieBox.model('reviews', reviewSchema);
const Rating=MovieBox.model('rating',userRatingSchema);
module.exports={usersSignUpData,AddmoviesSchema,Review,Rating};