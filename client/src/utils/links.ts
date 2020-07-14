import { ILink } from "@/types/Link";

export function hostName(url: string) {
  return new URL(url).host;
}

export function sortByDate(links: ILink[]) {
  const sorter = (a: ILink, b: ILink) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0
  }
  return [...links].sort(sorter);
}
