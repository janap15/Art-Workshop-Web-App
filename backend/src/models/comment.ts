import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Comment = new Schema({
    workshop : {
        type : ObjectId, ref: 'Workshop'
    },
    title : {
        type : String
    },
    user: {
        type: String
    },
    comment: {
        type: String
    },
    timestamp: {
        type: Date
    }
   
});

export default mongoose.model('Comment', Comment, 'comments');