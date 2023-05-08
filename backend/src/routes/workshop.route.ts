import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller';

const workshopRouter = express.Router();

workshopRouter.route('/getAllWorkshops').get(
    (req, res) => new WorkshopController().getAllWorkshops(req, res)
)

workshopRouter.route('/getAllAcceptedWorkshops').get(
    (req, res) => new WorkshopController().getAllAcceptedWorkshops(req, res)
)

workshopRouter.route('/getAllRequestedWorkshops').get(
    (req, res) => new WorkshopController().getAllRequestedWorkshops(req, res)
)

workshopRouter.route('/getWorkshop').post(
    (req, res) => new WorkshopController().getWorkshop(req, res)
)

workshopRouter.route('/getAllWorkshopsOfUser').post(
    (req, res) => new WorkshopController().getAllWorkshopsOfUser(req, res)
)
workshopRouter.route('/getAllWorkshopsOfOrganizer').post(
    (req, res) => new WorkshopController().getAllWorkshopsOfOrganizer(req, res)
)

workshopRouter.route('/getAllWorkshopsOfUserPending').post(
    (req, res) => new WorkshopController().getAllWorkshopsOfParticipantPending(req, res)
)

workshopRouter.route('/getAllLikedWorkshops').post(
    (req, res) => new WorkshopController().getAllLikedWorkshops(req, res)
)

workshopRouter.route('/removeLike').post(
    (req, res) => new WorkshopController().removeLike(req, res)
)

workshopRouter.route('/removeFromAccepted').post(
    (req, res) => new WorkshopController().removeFromAccepted(req, res)
)

workshopRouter.route('/addToWaiting').post(
    (req, res) => new WorkshopController().addToWaiting(req, res)
)

workshopRouter.route('/addToPending').post(
    (req, res) => new WorkshopController().addToPending(req, res)
)

workshopRouter.route('/addLike').post(
    (req, res) => new WorkshopController().addLike(req, res)
)

workshopRouter.route('/getComment').post(
    (req, res) => new WorkshopController().getComment(req, res)
)

workshopRouter.route('/addComment').post(
    (req, res) => new WorkshopController().addComment(req, res)
)

workshopRouter.route('/editWorkshop').post(
    (req, res) => new WorkshopController().editWorkshop(req, res)
)

workshopRouter.route('/getPhoto').post(
    (req, res) => new WorkshopController().getPhoto(req, res)
)

workshopRouter.route('/editWorkshopStatus').post(
    (req, res) => new WorkshopController().editWorkshopStatus(req, res)
)

workshopRouter.route('/addToAccepted').post(
    (req, res) => new WorkshopController().addToAccepted(req, res)
)

workshopRouter.route('/removeFromPending').post(
    (req, res) => new WorkshopController().removeFromPending(req, res)
)

workshopRouter.route('/requestToAddWorkshop').post(
    (req, res) => new WorkshopController().requestToAddWorkshop(req, res)
)

workshopRouter.route('/removeWorkshop').post(
    (req, res) => new WorkshopController().removeWorkshop(req, res)
)


export default workshopRouter;