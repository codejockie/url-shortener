import { mocked } from "ts-jest/utils";
import { copy } from "@/utils/misc";
import Links from "@/components/Links.vue";
import { factory, mountFactory } from "../../helper";

jest.mock("@/utils/misc", () => ({
  copy: jest.fn()
}));

describe("Links.vue", () => {
  test("renders a list links", () => {
    const wrapper = factory(Links, {
      propsData: {
        links: [
          {
            original: "https://example.com",
            shortened: "https://pbid.io/f3x2ab1c",
            urlId: "f3x2ab1c",
            createdAt: "2020-07-15T01:10:10.830Z",
            popularity: 100
          }
        ]
      }
    });

    expect(wrapper.find(".link_host").text()).toMatch("example.com");
    expect(wrapper.find(".url_link").text()).toMatch("https://example.com");
  });

  test("copies link to clipboard", () => {
    const mockedCopy = mocked(copy, true);
    const wrapper = mountFactory(Links, {
      propsData: {
        links: [
          {
            original: "https://example.com",
            shortened: "https://pbid.io/f3x2ab1c",
            urlId: "f3x2ab1c",
            createdAt: "2020-07-15T01:10:10.830Z",
            popularity: 100
          }
        ]
      }
    });

    wrapper.find("button.popularity").trigger("click");
    (wrapper.vm as any).copyToClipboard("https://pbid.io/f3x2ab1c");

    expect(mockedCopy).toHaveBeenCalledTimes(1);
  });
});
