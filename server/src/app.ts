import * as express from "express"
import * as bodyParser from "body-parser"

import router from "@/router"

class App {
  public app: express.Express

  constructor() {
    this.app = express()
    this.mountMiddleware()
    this.mountRoutes()
  }

  private mountMiddleware(): void {
    this.app.use(express.static("public"))
    this.app.use(bodyParser.json())
    this.app.use(
      bodyParser.urlencoded({
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
    this.app.get("/status", (req: express.Request, res: express.Response) =>
      res
        .status(200)
        .send({ status: "OK", timestamp: new Date().toISOString() })
    )
  }
}

const { app } = new App()
export default app
