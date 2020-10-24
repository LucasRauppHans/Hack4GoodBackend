import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import TrashPointController from "./controllers/TrashPointController";
import TrashPoint from "./models/TrashPoint";

const routes = Router();
const uploads = multer(uploadConfig);

routes.get("/trashpoint", TrashPointController.index);
routes.get("/trashpoint/:id", TrashPointController.show);
routes.post(
   "/trashpoint",
   uploads.array("images"),
   TrashPointController.create
);

export default routes;
