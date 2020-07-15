import * as dotenv from "dotenv"

import app from "./app"
import { connectDatabase } from "./database"

dotenv.config()
const { PORT = 4000 } = process.env

// MongoDB
connectDatabase()

app.listen(PORT, () => {
  console.log("App is running at %d", PORT)
})
