import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import ThuchiService from "../../service/ThuchiService";
import io from "socket.io-client";
import ThuChiAdd from "./ThuChiAdd";
import { set } from "firebase/database";
import ThuChiEdit from "./ThuChiEdit";
import Paginations from "../../support/Paginations";
const ThuChiList = () => {
  const [listShow, setListShow] = useState([]);
  const [listPaid, SetListPaid] = useState([]);
  const [text, setText] = useState("");
  const [retract, setRetract] = useState(0);
  const [spend, setSpend] = useState(0);
  const [flag, setflag] = useState(true);
  const addStudentByImport = (listStudent) => {
    toast.success("you have click me!");
    // let arr = [{ date: "2023-10-1", content: "ddd", status: 3, quantity: 2000 }, { date: "2023-10-2", content: "ddd", status: 3, quantity: 2000 }]
    // let name = "y"

    // ThuchiService.update({ name: 3, data: arr }).then(
    //     ress => {
    //         toast.success("ok")
    //     }
    // )
  };
  const getlist = (e) => {
    SetListPaid(e);
  };
  useEffect(() => {
    ThuchiService.getAll().then((res) => {
      if (res.data) {
        let listpaid = res.data.filter((item) => item !== null)[2]
          ? res.data.filter((item) => item !== null)[2].data
          : [];
        let datebypaid = listpaid ? listpaid[listpaid.length - 1].date : [];
        let listretract = res.data.filter((item) => item !== null)[0]
          ? res.data
              .filter((item) => item !== null)[0]
              .data.filter(
                (item) => new Date(item.date) >= new Date(datebypaid)
              )
          : [];
        let listSpend = res.data.filter((item) => item !== null)[1]
          ? res.data
              .filter((item) => item !== null)[1]
              .data.filter(
                (item) => new Date(item.date) >= new Date(datebypaid)
              )
          : [];

        setRetract(
          listretract.reduce((a, v) => (a = a + Number(v.quantity)), 0)
        );
        setSpend(listSpend.reduce((a, v) => (a = a + Number(v.quantity)), 0));
        let listShow = [...listretract];
        listSpend.map((item, index) => {
          listShow.push(item);
        });
        console.log(listShow.reduce((a, v) => (a = a + Number(v.quantity)), 0));
        setListShow(
          listShow.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      }
    });
  }, [flag]);
  const savedata = () => {
    setflag(!flag);
  };
  const changetext = (e) => {
    setText(e.target.value);
  };
  const deletepaid = (id, status) => {
    ThuchiService.getbyid(status).then((res) => {
      console.log(res.data.data.filter((item) => item.id != id));
      ThuchiService.update({
        name: status,
        data: res.data.data.filter((item) => item.id != id),
      }).then((ress) => {
        toast.success("Xóa thành công");
        setflag(!flag);
      });
    });
  };
  return (
    <>
      <Header />
      <main id="cabin_list" className="main">
        <div className="container">
          <div className="row mt-5  ">
            <div className="col col-md-4">
              <input
                type="text"
                className="form-control  ms-2 "
                id="teacher"
                onChange={(e) => changetext(e)}
                value={text}
                placeholder="Nhập nội dung tìm kiếm"
              />
            </div>
            {/* <div className="col col-md-6">
                        <input type="date" className="form-control w-50 ms-2 " id="teacher" onChange={(e) => changedate(e)} value={date} placeholder="Nhập nội dung tìm kiếm" />
                    </div> */}
            <div className="col col-md-2">
              <ThuChiAdd savedata={savedata} />
              {/* <ImPort getdata={getdata} head={head} data={Data} /> */}
            </div>
          </div>
          <div className="row mt-4 bg-dark p-4 text-white">
            <div className="col col-md-4 d-flex   justify-content-center">
              Tổng nhập
            </div>
            <div className="col col-md-4 d-flex   justify-content-center">
              Tổng gửi
            </div>
            <div className="col col-md-4 d-flex   justify-content-center">
              Còn lại
            </div>
          </div>
          <div className="row bg-success p-3 text-white">
            <div className="col col-md-4 d-flex   justify-content-center">
              {retract ? retract : 0}
            </div>
            <div className="col col-md-4 d-flex   justify-content-center">
              {spend ? spend : 0}
            </div>
            <div className="col col-md-4 d-flex  justify-content-center">
              {retract - spend ? retract - spend : 0}
            </div>
          </div>
          <table className="table table-bordered table-hover">
            <thead className="col bg-dark p-4 text-white mt-4">
              <tr>
                <th className="col p-4  mt-4">STT</th>
                <th scope="col">Ngày</th>
                <th scope="col">Nội dung</th>

                <th scope="col">Số lượng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Quản lý</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                                listShow && listShow.length > 0 && (
                                    <tr>
                                        <td colSpan={3}>Tổng</td>
                                        <td>{tongtien}</td>
                                    </tr>
                                )
                            } */}
              {listPaid &&
                listPaid.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>

                      <td>{item.content}</td>
                      <td>{item.quantity}</td>
                      <td>{item.status}</td>
                      <td>
                        {/* <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.thuchiId)}>
                                                    <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                </a>
                                                <ThuChi_Edit id={item.thuchiId} save={save} /> */}
                        <ThuChiEdit
                          id={item.id}
                          status={item.status}
                          savedata={savedata}
                        />
                        <input
                          onClick={() => deletepaid(item.id, item.status)}
                          type="button"
                          className="btn btn-danger ms-4"
                          value={"delete"}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Paginations itemsPerPage={8} list={listShow} getlist={getlist} />
        </div>
      </main>
    </>
  );
};

export default ThuChiList;
