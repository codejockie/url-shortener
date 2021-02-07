import { copy } from "@/utils/misc";

type Type = "copy" | "cut" | "paste";
interface EventInitDict extends EventInit {
  data: string;
  dataType: string;
  clipboardData: {
    setData(arg0: string, arg1: string): void;
  };
}

class ClipboardEvent extends Event {
  constructor(type: Type, options?: EventInitDict) {
    super(type, options);
  }
}

describe("hostName", () => {
  test("returns host part of a url", () => {
    const spy = jest.fn();
    const addSpy = jest.fn();
    const removeSpy = jest.fn();
    Object.defineProperty(document, "execCommand", { value: spy });
    Object.defineProperty(document, "addEventListener", { value: addSpy });
    Object.defineProperty(document, "removeEventListener", {
      value: removeSpy,
    });

    copy("https://pbid.io");
    expect(spy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalled();
    // Trigger the listener
    addSpy.mock.calls[0][1](new ClipboardEvent("copy"));
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mock.calls[0][1](new ClipboardEvent("copy"));
  });
});
