import { factory } from "../../helper"
import LocaleDate from "@/components/LocaleDate.vue"

describe("LocaleDate.vue", () => {
  test("renders a locale date", () => {
    const wrapper = factory(LocaleDate, {
      propsData: {
        date: "2020-07-15T01:10:10.830Z",
      },
    })

    expect(wrapper.find(".data_link").text()).toMatch("15.07.2020")
  })
})
