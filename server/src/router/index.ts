import { Router } from "express"
import * as linksController from "../controllers/links.controller"

export default () => {
  const router = Router()
  router
    .route("/links")
    .get(linksController.getLinks)
    .post(linksController.shortenLink)
  router
    .route("/links/:urlId")
    .get(linksController.getLinkById)

  return router
}
