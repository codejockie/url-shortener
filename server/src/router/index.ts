import { Application } from "express"
import * as linksController from "../controllers/LinksController"

export const routes = (app: Application) => {
  app.get("/api/links/:urlId", linksController.getLinkById)
  app
    .post("/api/links/shorten", linksController.shortenUrl)
  app
    .delete("/api/links/:urlId", linksController.deleteLink)
}
