export function toDate(date: string) {
  return new Date(date)
    .toISOString()
    .substring(0, 10)
    .replace(/[-/]/g, ".");
}
