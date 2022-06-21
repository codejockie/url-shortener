import { shortId } from "@/utils/short-id"

describe("shortId", () => {
  test("generates 8 character long id", () => {
    expect(shortId()).toHaveLength(8)
  })
})
