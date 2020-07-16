jest.mock("@/database/links/links.model")
import * as mongoose from "mongoose"
import * as request from "supertest"
import { MongoMemoryServer } from "mongodb-memory-server"
import app from "@/app"
import { LinkModel } from "@/database/links/links.model"

let mongoServer
const opts = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

describe("Links Controller", () => {
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
      ;(LinkModel as any).mockImplementationOnce(() => ({
        urlId: "1as2dtp9",
        original: "https://bing.com",
        shortened: "https://pbid.io/1as2dtp9",
      }))
      const response = await request(app)
        .post("/api/links")
        .send({ url: "https://bing.com" })

      expect(response.status).toEqual(201)
      expect(response.body.original).toEqual("https://bing.com")
    })

    test("handles error", async () => {
      ;(LinkModel.findOneOrCreate as any).mockRejectedValueOnce(
        "An error occurred, please try again"
      )
      const response = await request(app)
        .post("/api/links")
        .send({ url: "https://bing.com" })

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual("An error occurred, please try again")
    })
  })

  describe("getLinkById", () => {
    test("gets a link by id", async () => {
      ;(LinkModel.findOneAndUpdate as any).mockResolvedValueOnce({
        urlId: "74ads1ae",
        original: "https://bing.com",
        shortened: "https://pbid.io/74ads1ae",
      })
      const response = await request(app).get("/api/links/74ads1ae")

      expect(response.status).toEqual(200)
      expect(response.body).toEqual({
        urlId: "74ads1ae",
        original: "https://bing.com",
        shortened: "https://pbid.io/74ads1ae",
      })
    })

    test("handles not found", async () => {
      ;(LinkModel.findOneAndUpdate as any).mockResolvedValueOnce(null)
      const response = await request(app).get("/api/links/74ads1ae")

      expect(response.status).toEqual(404)
      expect(response.body).toEqual(null)
    })

    test("handles error", async () => {
      ;(LinkModel.findOneAndUpdate as any).mockRejectedValueOnce(
        "An error occurred, please try again"
      )
      const response = await request(app).get("/api/links/74ads1ae")

      expect(response.status).toEqual(500)
      expect(response.body.error).toEqual("An error occurred, please try again")
    })
  })

  describe("getLinks", () => {
    test("gets all links", async () => {
      const response = await request(app).get("/api/links")

      expect(response.status).toEqual(200)
    })

    test("handles error", async () => {
      ;(LinkModel.find as any).mockRejectedValueOnce(
        "An error occurred, please try again"
      )
      const response = await request(app).get("/api/links")

      expect(response.status).toEqual(500)
      expect(response.body.error).toEqual("An error occurred, please try again")
    })
  })
})
