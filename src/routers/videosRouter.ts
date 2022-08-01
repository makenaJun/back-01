import {Router} from "express";
import {VideosController} from "../controllers/videosController";

export const videoRouter = Router();

videoRouter.get('', VideosController.getAll);
videoRouter.get('/:id', VideosController.getById);
videoRouter.post('', VideosController.create);
videoRouter.put('/:id', VideosController.update);
videoRouter.delete('/:id', VideosController.delete);

