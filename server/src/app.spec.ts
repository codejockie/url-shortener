import * as request from "supertest"
import { app } from "@/app"

describe("App", () => {
  test("app works fine", async () => {
    const result = await request(app).get("/status")

    expect(result.status).toEqual(200)
    expect(result.body.status).toEqual("OK")
  })

  test("handles unknown route", async () => {
    const result = await request(app).get("/unknown-invalid")
    expect(result.status).toEqual(404)
    expect(result.body.status).toEqual("Fail")
  })
})
