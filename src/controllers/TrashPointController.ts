import { Request, Response } from "express";
import { getRepository } from "typeorm";
import TrashPoint from "../models/TrashPoint";
import trashpoint_view from "../views/trashpoint_view";
import * as Yup from "yup";

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const trashpointsRepository = getRepository(TrashPoint);
        const trashpoint = await trashpointsRepository.findOneOrFail(id, {
            relations: ["images"],
        });
        return response.json(trashpoint_view.render(trashpoint));
    },
    async index(request: Request, response: Response) {
        const trashpointsRepository = getRepository(TrashPoint);
        const trashpoints = await trashpointsRepository.find({
            relations: ["images"],
        });
        return response.json(trashpoint_view.renderMany(trashpoints));
    },
    async create(request: Request, response: Response) {
        const {
            reporterName,
            reporterContact,
            latitude,
            longitude,
            description,
            assignee,
            assigneeContact,
            severity,
        } = request.body;

        const trashpointsRepository = getRepository(TrashPoint);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map((image) => {
            return { path: image.filename };
        });

        const data = {
            reporterName,
            reporterContact,
            latitude,
            longitude,
            description,
            assignee,
            assigneeContact,
            severity,
            images: images,
        };

        const schema = Yup.object().shape({
            reporterName: Yup.string().required(),
            reporterContact: Yup.string().required().max(300),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            description: Yup.string().required().max(300),
            assignee: Yup.string().required(),
            assigneeContact: Yup.string().required().max(300),
            severity: Yup.string().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const trashpoint = trashpointsRepository.create(data);

        await trashpointsRepository.save(trashpoint);

        return response.status(201).json(trashpoint);
    },
};
