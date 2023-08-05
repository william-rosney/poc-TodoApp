import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7028/api",
  headers: {
    "Content-type": "application/json"
  }
});