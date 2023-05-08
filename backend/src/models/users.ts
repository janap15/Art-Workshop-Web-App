import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Users = new Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type: String
    },
    profileImg : {
        type : String
    },
    orgName : {          // za organizatora
        type : String
    },
    state : {
        type: String
    },
    city : {
        type: String
    },
    postNum : {
        type : Number
    },
    street : {
        type : String
    },
    streetNum : {
        type: Number
    },
    MB : {               // za organizatora
        type: Number
    },
    type : {              // 0 - admin, 1 - ucesnik, 2 - organizator
        type: Number
    },
    status : {
        type : String   // obrada, aktivan ako je prihvacen zahtev za registraciju, neaktivan ako je odbijen
    }
});

export default mongoose.model('Users', Users, 'users');