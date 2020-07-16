import { links } from "../../helper";
import { hostName, sortByDate } from "@/utils/links";

describe("hostName", () => {
  test("returns host part of a url", () => {
    expect(hostName("https://pbid.io")).toBe("pbid.io");
  });
});

describe("sortByDate", () => {
  test("sort links in descending order of date added", () => {
    const sorted = [
      {
        original: "https://pbid.io",
        shortened: "https://pbid.io/3ft2da5c",
        urlId: "3ft2da5c",
        createdAt: "2020-07-15T01:10:10.830Z",
        popularity: 150
      },
      {
        original: "https://pbid.io",
        shortened: "https://pbid.io/3ft2da5d",
        urlId: "3ft2da5d",
        createdAt: "2020-07-15T01:10:10.830Z",
        popularity: 150
      },
      {
        original: "https://example.com",
        shortened: "https://pbid.io/f3x2ab1c",
        urlId: "f3x2ab1c",
        createdAt: "2020-07-14T01:10:10.830Z",
        popularity: 100
      }
    ];
    expect(sortByDate(links)).toEqual(sorted);
  });
});
