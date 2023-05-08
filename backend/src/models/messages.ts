import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Message = new Schema({
    sender : {
        type: String
    },
    receiver : {
        type : String
    },
    participant : {
        type : String
    },
    organizer : {
        type : String
    },
    text : {
        type : String
    },
    timestamp: {
        type : Date
    },
    workshop : {
        type : ObjectId, ref: 'Workshop'
    },
    title : {
        type : String
    }
});

export default mongoose.model('Message', Message, 'messages');