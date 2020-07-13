import * as dotenv from "dotenv"
import * as express from "express"
import * as bodyParser from "body-parser"

import router from "./router"
import { connect } from "./database"

dotenv.config()
const app = express()
const { PORT = 4000 } = process.env

// MongoDB
connect()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use("/api", router())

app.listen(PORT, () => {
  console.log("App is running at %d", PORT)
})
