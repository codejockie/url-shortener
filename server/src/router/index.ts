import { Router } from "express"
import * as linksController from "../controllers/LinksController"

export default () => {
  const router = Router()
  router
    .route("/links")
    .get(linksController.getLinks)
    .post(linksController.shortenUrl)
  router
    .route("/links/:urlId")
    .get(linksController.getLinkById)
    .delete(linksController.deleteLink)

  return router
}
