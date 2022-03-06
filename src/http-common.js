import axios from "axios";

export default axios.create({
  baseURL: "https://load-board-api-9xx3g.ondigitalocean.app/",
  headers: {
    "Content-type": "application/json"
  }
});