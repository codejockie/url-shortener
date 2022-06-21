import * as express from "express"
import router from "@/router"
import { BadRequest } from "@/errors/bad-request"

class App {
  public app: express.Express

  constructor() {
    this.app = express()
    this.configure()
  }

  private mountMiddleware(): void {
    this.app.use(express.static("public"))
    this.app.use(express.json())
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    )

    // Enable CORS
    this.app.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*")
      response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      )
      next()
    })
  }

  private mountRoutes(): void {
    this.app.use("/api", router())
    this.app.get("/status", (req, res) =>
      res.status(200).send({ status: "OK", timestamp: new Date().toISOString() })
    )

    // Catch all route handler
    this.app.all("*", (req, res, next) => {
      const err = new BadRequest(`${req.originalUrl} not found`)
      next(err)
    })
  }

  private handleError() {
    // Error Handler
    this.app.use((err, req, res, next) => {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    })
  }

  private configure() {
    this.mountMiddleware()
    this.mountRoutes()
    this.handleError()
  }
}

export const { app } = new App()
