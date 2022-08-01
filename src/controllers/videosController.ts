import {Request, Response} from "express";

let videos: VideoType[] = [
    {
        id: 1,
        title: 'My first video',
        author: "Mike Mao",
    }
]

export const VideosController = {
    getAll(req: Request, res: Response) {
        res.status(200).send(videos);
    },

    getById(req: Request, res: Response) {
        const {id} = req.params;

        const video = videos.find(el => el.id === +id);

        if (!video) {
            return res.sendStatus(404);
        }

        res.status(200).send(video);
    },

    create(req: Request, res: Response) {
        const {title} = req.body;

        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            const error: ErrorResponseType = {
                errorsMessages: [
                    {
                        message: "title should be string",
                        field: "title"
                    },
                ]
            }

            return res.status(400).send(error);
        }

        const newVideo: VideoType = {
            id: Date.now(),
            title: title.trim(),
            author: "Mike Mao",
        };

        videos.push(newVideo);

        res.status(201).send(newVideo);
    },
    update(req: Request, res: Response) {
        const {id} = req.params;
        const {title} = req.body;

        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            const error: ErrorResponseType = {
                errorsMessages: [
                    {
                        message: "title should be string",
                        field: "title"
                    },
                ]
            }

            return res.status(400).send(error);
        }

        const video = videos.find(el => el.id === +id);

        if (!video) {
            return res.sendStatus(404);
        }

        videos = videos.map(el => {
            if (el.id === +id) {
                return {...el, title: title};
            }
            return el;
        });

        res.sendStatus(204);
    },
    delete(req: Request, res: Response) {
        const {id} = req.params;

        const newVideos = videos.filter(el => el.id !== +id);

        if (newVideos.length === videos.length) {
            return res.sendStatus(404);
        }

        videos = newVideos;

        res.sendStatus(204);
    }
}


// TYPES

type VideoType = {
    id: number,
    title: string,
    author: string
}

type ErrorResponseType = {
    errorsMessages: ErrorType[],
}

type ErrorType = {
    message: string,
    field: string
}

