import { reduceLink } from "@/utils/reduce-link"

describe("reduceLink", () => {
  test("creates a short url by id", () => {
    const linkId = "d8hdhs9a"
    expect(reduceLink(linkId)).toEqual(`https://pbid.io/${linkId}`)
  })
})
