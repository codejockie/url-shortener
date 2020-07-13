import * as mongoose from "mongoose"
import { LinkModel } from "./links/links.model"

let database: mongoose.Connection
const { MONGODB_URI = "mongodb://localhost:27017/url-shortener" } = process.env

export const connect = () => {
  if (database) {
    return
  }

  mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  database = mongoose.connection

  database.once("open", async () => {
    console.log("Connected to database")
  })

  database.on("error", () => {
    console.log("Error connecting to database")
  })

  return {
    LinkModel,
  }
}

export const disconnect = () => {
  if (!database) {
    return
  }

  mongoose.disconnect()
}
