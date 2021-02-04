jest.mock("@/database/links/links.model")
import * as request from "supertest"
import { app } from "@/app"
import { LinkModel } from "@/database/links/links.model"

describe("Links Controller", () => {
  const mockFind = LinkModel.find as jest.Mock
  const mockFindOneOrCreate = LinkModel.findOneOrCreate as jest.Mock
  const mockFindOneAndUpdate = LinkModel.findOneAndUpdate as jest.Mock
  const MockedLinkModel = LinkModel as jest.MockedClass<typeof LinkModel>

  beforeEach(() => {
    mockFind.mockClear()
    mockFindOneOrCreate.mockClear()
    mockFindOneAndUpdate.mockClear()
  })

  describe("shortenLink", () => {
    test("shortens url", async () => {
      MockedLinkModel.mockImplementationOnce(
        () =>
          ({
            linkId: "1as2dtp9",
            original: "https://bing.com",
            shortened: "https://pbid.io/1as2dtp9",
          } as any)
      )
      const response = await request(app).post("/api/links").send({ url: "https://bing.com" })

      expect(response.status).toEqual(201)
      expect(response.body.original).toEqual("https://bing.com")
    })

    test("handles error", async () => {
      mockFindOneOrCreate.mockRejectedValueOnce("An error occurred, please try again")
      const response = await request(app).post("/api/links").send({ url: "https://bing.com" })

      expect(response.status).toEqual(500)
      expect(response.body.error).toEqual("An error occurred, please try again")
    })
  })

  describe("getLinkById", () => {
    test("gets a link by id", async () => {
      mockFindOneAndUpdate.mockResolvedValueOnce({
        linkId: "74ads1ae",
        original: "https://bing.com",
        shortened: "https://pbid.io/74ads1ae",
      })
      const response = await request(app).get("/api/links/74ads1ae")

      expect(response.status).toEqual(200)
      expect(response.body).toEqual({
        linkId: "74ads1ae",
        original: "https://bing.com",
        shortened: "https://pbid.io/74ads1ae",
      })
    })

    test("handles not found", async () => {
      mockFindOneAndUpdate.mockResolvedValueOnce(null)
      const response = await request(app).get("/api/links/74ads1ae")

      expect(response.status).toEqual(404)
      expect(response.body).toEqual(null)
    })

    test("handles error", async () => {
      mockFindOneAndUpdate.mockRejectedValueOnce("An error occurred, please try again")
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
      mockFind.mockRejectedValueOnce("An error occurred, please try again")
      const response = await request(app).get("/api/links")

      expect(response.status).toEqual(500)
      expect(response.body.error).toEqual("An error occurred, please try again")
    })
  })
})
