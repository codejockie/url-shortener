import * as mongoose from "mongoose"

let database: mongoose.Connection
const { MONGODB_URI = "mongodb://127.0.0.1:27017/url-shortener" } = process.env

const connectWithRetry = () => {
  mongoose
    .connect(MONGODB_URI, {
      bufferMaxEntries: 0,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info("Connected to database (mongo)")
      database = mongoose.connection
    })
    .catch(() => {
      console.info("MongoDB connection unsuccessful, retrying in 5 seconds...")
      setTimeout(() => {
        console.info("Retry connecting to MongoDB...")
        connectWithRetry()
      }, 5000)
    })
}

export const connect = () => {
  if (database) {
    return
  }

  connectWithRetry()
}

export const disconnect = () => {
  if (!database) {
    return
  }

  mongoose.disconnect()
}
