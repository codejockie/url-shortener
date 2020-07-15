import * as mongoose from "mongoose"
import * as request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import app from "@/app"

let mongoServer
const opts = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe("shortenLink", () => {
  test("shortens url", async () => {
    const response = await request(app)
      .post("/api/links")
      .send({ url: "https://bing.com" })

    expect(response.status).toEqual(201)
    expect(response.body.original).toEqual("https://bing.com")
  })
})

describe("getLinkById", () => {
  test("gets a link by id", async () => {
    const response = await request(app)
      .get("/api/links/74ads1ae")

    expect(response.status).toEqual(404)
  })
})

describe("getLinks", () => {
  test("gets all links", async () => {
    const response = await request(app)
      .get("/api/links")

    expect(response.status).toEqual(200)
  })
})
