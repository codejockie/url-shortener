export function toLocaleDate(date: string) {
  return new Date(date).toLocaleDateString().replace(/[-/]/g, ".");
}
