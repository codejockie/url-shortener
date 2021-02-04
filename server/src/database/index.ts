import * as mongoose from "mongoose"
import { winstonLogger } from "@/utils/logger"

let database: mongoose.Connection
const logger = winstonLogger("database")
const { MONGODB_URI = "mongodb://127.0.0.1:27017/url-shortener" } = process.env

const connectWithRetry = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {
      bufferMaxEntries: 0,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    logger.info("Connected to database (MongoDB)")
    database = connection
  } catch (err) {
    logger.info("MongoDB connection unsuccessful, retrying in 5 seconds...")
    setTimeout(() => {
      logger.info("Retry connecting to MongoDB...")
      connectWithRetry()
    }, 5000)
  }
}

export const connectDatabase = async () => {
  if (database) {
    return
  }

  await connectWithRetry()
}

export const disconnectDatabase = () => {
  if (!database) {
    return
  }

  mongoose.disconnect()
  logger.info("Disconnected from database (MongoDB)")
}
