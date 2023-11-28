import { db } from "../config/firebase";
import { set, ref, onValue, remove } from "firebase/database";
import axios from "axios";
import axiosClient from "./Main";
const SCHEMA = "thuchi";
class ThuchiService {
  getAll() {
    const url = `${SCHEMA}.json`;
    return axiosClient.get(url);
  }
  getbyid(id) {
    const url = `/${SCHEMA}/${id}.json`;
    return axiosClient.get(url);
  }
  update(data) {
    const url = `/${SCHEMA}/${data.name}.json`;
    return axiosClient.patch(url, data);
  }
}

export default new ThuchiService();
