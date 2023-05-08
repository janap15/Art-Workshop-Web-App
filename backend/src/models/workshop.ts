import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Workshop = new Schema({
    title: {
        type: String
    },
    organizer: {
        type: String
    },
    photo : {
        type : String
    },
    gallery : {
        type : [String], default: []
    },
    date: {
        type: Date
    },
    address : {
        type : String
    },
    description_short : {
        type : String
    },
    description_long : {
        type : String
    },
    number_participants : {
        type : Number
    }, 
    number_left : {
        type : Number, default: 0
    },
    waiting : {
        type: [String], default: []
    },
    accepted : {
        type: [String], default: []
    },
    pending : {
        type: [String], default: []
    },
    likes : {
        type: [String], default : []
    },
    comments : {
        type : [ObjectId], default: [] 
    },
    status : {
        type : String
    }
});

export default mongoose.model('Workshop', Workshop, 'workshops');