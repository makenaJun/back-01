import {Router} from "express";
import {videoRouter} from "./videosRouter";

export const rootRouter = Router();

rootRouter.use('/videos', videoRouter);
