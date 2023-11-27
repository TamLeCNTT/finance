import { db } from "../config/firebase";
import { set, ref, onValue, remove } from "firebase/database";
import axios from "axios";
import axiosClient from "./Main";
const SCHEMA = "user/test";
class UserService {
  getAll() {
    const url = `${SCHEMA}.json`;
    return axiosClient.get(url);
  }

  update(user) {
    const url = `/${SCHEMA}/${user.date}.json`;
    return axiosClient.patch(url, user.data);
  }
  //   add(data) {
  //     const url = `/${SCHEMA}/${data.username}.json`;
  //     return axiosClient.patch(url, data);
  //   }
}

export default new UserService();
