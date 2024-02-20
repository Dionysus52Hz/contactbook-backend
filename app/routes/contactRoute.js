import express from 'express';
import { CONTROLLERS } from '../controllers/contactController.js';

const router = express.Router();

router
   .route('/')
   .get(CONTROLLERS.FINDALL)
   .post(CONTROLLERS.CREATE)
   .delete(CONTROLLERS.DELETEALL);

router.route('/favorite').get(CONTROLLERS.FINDALLFAVORITE);

router
   .route('/:id')
   .get(CONTROLLERS.FINDONE)
   .put(CONTROLLERS.UPDATE)
   .delete(CONTROLLERS.DELETE);

export const CONTACT_ROUTER = router;
