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
   async update(request: Request, response: Response) {
      const trashpointsRepository = getRepository(TrashPoint);
      const { id } = request.params;

      let currentTrashpoint = await trashpointsRepository.findOne(id);

      if (currentTrashpoint) {
         const updatedTrashpoint = await trashpointsRepository.merge(
            currentTrashpoint,
            request.body
         );
         const savedTrashpoint = await trashpointsRepository.save(
            updatedTrashpoint
         );
         const toperTrashpoint = await trashpointsRepository.findOne(id);
         return response.send(toperTrashpoint);
      }
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
         progress,
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
         progress,
         images: images,
      };

      const schema = Yup.object().shape({
         reporterName: Yup.string().required(),
         reporterContact: Yup.string().required(),
         latitude: Yup.number().required(),
         longitude: Yup.number().required(),
         description: Yup.string().required(),
         assignee: Yup.string(),
         assigneeContact: Yup.string(),
         severity: Yup.string().required(),
         progress: Yup.string().required(),
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
