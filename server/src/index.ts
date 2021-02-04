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

// Error Handler
app.use((err, req, res, next) => {
  logger.error(err.message)
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

app.listen(PORT, () => {
  logger.info(`App is running on localhost:${PORT}`)
})
