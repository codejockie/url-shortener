import axios from "./axios";

export class LinksService {
  getLinks() {
    return axios.get("/links");
  }

  shortenLink(url: string) {
    return axios.post("/links", { url });
  }
}

// A singleton instance
export default new LinksService();
