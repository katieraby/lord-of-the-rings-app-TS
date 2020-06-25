import axios from "axios";
const token: string = "IDWlXDsJc2COm3wWMQun";

export default axios.create({
  baseURL: "https://the-one-api.herokuapp.com/v1",
  headers: { Authorization: "Bearer " + token },
});
