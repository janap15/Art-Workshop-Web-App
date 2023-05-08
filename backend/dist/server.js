"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadGalleryImages = exports.uploadMainImages = exports.uploadProfileImages = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const login_router_1 = __importDefault(require("./routes/login.router"));
const register_router_1 = __importDefault(require("./routes/register.router"));
const passwordchange_route_1 = __importDefault(require("./routes/passwordchange.route"));
const workshop_route_1 = __importDefault(require("./routes/workshop.route"));
const users_router_1 = __importDefault(require("./routes/users.router"));
const sendemailsworkshop_router_1 = __importDefault(require("./routes/sendemailsworkshop.router"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/PIA_PROJEKAT');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
const userUpload = (0, multer_1.default)({ storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploadsProfileImages');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }) });
const workshopUpload = (0, multer_1.default)({ storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploadsWorkshopImages');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }) });
exports.uploadProfileImages = userUpload.single('profileImg');
exports.uploadMainImages = workshopUpload.single('photo');
exports.uploadGalleryImages = workshopUpload.array('gallery');
app.use(express_1.default.json({ limit: '10MB' }));
router.use('/login', login_router_1.default);
router.use('/register', register_router_1.default);
router.use('/passwordChange', passwordchange_route_1.default);
router.use('/workshop', workshop_route_1.default);
router.use('/users', users_router_1.default);
router.use('/sendEmails', sendemailsworkshop_router_1.default);
router.use('/chat', chat_route_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map