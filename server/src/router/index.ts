import { Application } from "express"
import * as linksController from "../controllers/LinksController"

export const routes = (app: Application) => {
  app.get("/api/links", linksController.getLinks)
  app.post("/api/links", linksController.shortenUrl)
  app.get("/api/links/:urlId", linksController.getLinkById)
  app.delete("/api/links/:urlId", linksController.deleteLink)
}
