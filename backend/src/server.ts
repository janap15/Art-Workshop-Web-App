import express from 'express';
import cors from  'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import multer from 'multer';
import loginRouter from './routes/login.router';
import registerRouter from './routes/register.router';
import passwordRouter from './routes/passwordchange.route';
import workshopRouter from './routes/workshop.route';
import usersRouter from './routes/users.router';
import sendEmailsRouter from './routes/sendemailsworkshop.router';
import chatRouter from './routes/chat.route';

const app = express();
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/PIA_PROJEKAT');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();

const userUpload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadsProfileImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})});

const workshopUpload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadsWorkshopImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})});

export var uploadProfileImages = userUpload.single('profileImg');
export var uploadMainImages = workshopUpload.single('photo');
export var uploadGalleryImages = workshopUpload.array('gallery');

app.use(express.json({ limit: '10MB' }));

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/passwordChange', passwordRouter);
router.use('/workshop', workshopRouter);
router.use('/users', usersRouter);
router.use('/sendEmails', sendEmailsRouter);
router.use('/chat', chatRouter);

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));