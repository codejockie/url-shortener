import * as dotenv from "dotenv"
import * as winston from "winston"
import { app } from "./app"
import { connectDatabase } from "./database"
import { winstonLogger } from "./utils/logger"

dotenv.config()
const { PORT = 4000 } = process.env
const logger = winstonLogger("index")

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

// MongoDB
connectDatabase()

app.listen(PORT, () => {
  logger.info(`App is running on localhost:${PORT}`)
})
