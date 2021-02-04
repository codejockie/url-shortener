import { Router } from "express"
import * as linksController from "@/controllers/links.controller"
import { extractLinkId } from "@/middleware"

export default () => {
  const router = Router()
  router.route("/links").get(linksController.getLinks).post(linksController.shortenLink)

  router.param("linkId", extractLinkId)
  router.route("/links/:linkId").get(linksController.getLinkById)

  return router
}
