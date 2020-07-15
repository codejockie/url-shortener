import { generate } from "@/utils/shortid"

describe("generate", () => {
  test("generates short id 8 characters long", () => {
    expect(generate()).toHaveLength(8)
  })
})
