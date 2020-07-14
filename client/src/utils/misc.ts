export function copy(url: string) {
  const listener = (ev: ClipboardEvent) => {
    ev?.preventDefault();
    ev?.clipboardData?.setData("text/plain", url);
  };
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}