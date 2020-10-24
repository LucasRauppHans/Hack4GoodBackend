import TrashPoint from "../models/TrashPoint";
import imagesView from "./images_view";

export default {
   render(trashpoint: TrashPoint) {
      return {
         id: trashpoint.id,
         reporterName: trashpoint.reporterName,
         reporterContact: trashpoint.reporterContact,
         latitude: trashpoint.latitude,
         longitude: trashpoint.longitude,
         description: trashpoint.description,
         assignee: trashpoint.assignee,
         assigneeContact: trashpoint.assigneeContact,
         severity: trashpoint.severity,
         progress: trashpoint.progress,
         images: imagesView.renderMany(trashpoint.images),
      };
   },

   renderMany(trashpoints: TrashPoint[]) {
      return trashpoints.map((trashpoint) => this.render(trashpoint));
   },
};
