import { mocked } from "ts-jest/utils"
import { copy } from "@/utils/misc"
import Home from "@/views/Home.vue"
import { factory } from "../../helper"

jest.mock("@/utils/misc", () => ({
  copy: jest.fn(),
}))

jest.mock("axios", () => {
  return {
    create: jest.fn().mockImplementation(() => ({
      get: jest.fn((path: string) => {
        return {
          data: [
            {
              original: "https://example.com",
              shortened: "https://pbid.io/f3x2ab1c",
              urlId: "f3x2ab1c",
              createdAt: "2020-07-15T01:10:10.830Z",
              popularity: 100,
            },
          ],
        }
      }),
      post: jest.fn((path: string, data: Record<string, any>) => {
        return {
          data: {
            original: data.url, // "https://bing.com",
            shortened: "https://pbid.io/f3z2ac6c",
            urlId: "f3z2ac6c",
            createdAt: "2020-07-13T01:10:10.830Z",
            popularity: 100,
          },
          status: 201,
        }
      }),
    })),
  }
})

describe("Home.vue", () => {
  test("renders a list links", (done) => {
    const wrapper = factory(Home)

    wrapper.vm.$nextTick(() => {
      expect((wrapper.vm as any).links).toEqual([
        {
          original: "https://example.com",
          shortened: "https://pbid.io/f3x2ab1c",
          urlId: "f3x2ab1c",
          createdAt: "2020-07-15T01:10:10.830Z",
          popularity: 100,
        },
      ])
      done()
    })
  })

  test("calls shorten method", (done) => {
    const wrapper = factory(Home)
    wrapper.find("input[type=text]").setValue("https://bing.com")

    wrapper.vm.$nextTick(() => {
      wrapper.find("button.btn-shorten").trigger("click")
      expect((wrapper.vm as any).oldUrl).toBe("https://bing.com")

      wrapper.vm.$nextTick(() => {
        expect((wrapper.vm as any).links.length).toBe(2)
        expect((wrapper.vm as any).links[0].urlId).toBe("f3z2ac6c")
        expect((wrapper.vm as any).links[0].original).toBe("https://bing.com")
        expect((wrapper.vm as any).links[0].shortened).toBe(
          "https://pbid.io/f3z2ac6c"
        )
        done()
      })
    })
  })

  test("watches for url input field change", (done) => {
    const wrapper = factory(Home)
    wrapper.setData({ oldUrl: "https://pbid.io/f3z2ac6c" })

    wrapper.vm.$nextTick(() => {
      wrapper.setData({ url: "https://github.com/codejockie" })

      wrapper.vm.$nextTick(() => {
        expect((wrapper.vm as any).buttonText).toBe("Shorten")
        done()
      })
    })
  })

  test("copies link to clipboard", (done) => {
    const wrapper = factory(Home)
    const mockedCopy = mocked(copy, true)
    wrapper.find("input[type=text]").setValue("https://bing.com")

    wrapper.vm.$nextTick(() => {
      wrapper.find("button.btn-shorten").trigger("click")
      expect((wrapper.vm as any).oldUrl).toBe("https://bing.com")

      wrapper.vm.$nextTick(() => {
        wrapper.find("button.btn-shorten").trigger("click")

        expect(mockedCopy).toHaveBeenCalledTimes(1)
        expect(mockedCopy).toHaveBeenCalledWith("https://pbid.io/f3z2ac6c")
        done()
      })
    })
  })
})
