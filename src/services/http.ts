import axios from "axios";
import config from "config";

const http = axios.create({ baseURL: config.api.baseURL });

export default http;
