import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Token = new Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    timestamp : {
        type : Date
    },
    used : {
        type: Boolean
    } 
   
});

export default mongoose.model('Token', Token, 'tokens');