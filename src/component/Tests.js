import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { set, ref, onValue, remove } from "firebase/database";
import UserService from "../service/UserService";
const Tests = () => {
  //   useEffect(() => {
  //     UserService.update({
  //       date: "20-03-2023",
  //       data: {
  //         datas: [
  //           { username: "tam", password: "dd" },
  //           { username: "tams", password: "dd" },
  //         ],
  //       },
  //     }).then((res) => {
  //       console.log(res.data);
  //     });
  //     UserService.getAll().then((res) => {
  //       console.log(res.data);
  //     });
  //     // set(ref(db, "/user/hhh"), {
  //     //   name: "kkskk",
  //     //   paaa: "ddjkdkdky",
  //     // });
  //     onValue(ref(db, "/user"), (res) => {
  //       console.log(Object.values(res.val()));
  //     });
  //     // remove(ref(db, "/user/hha"));
  //   }, []);
  return <div>Tests</div>;
};

export default Tests;
