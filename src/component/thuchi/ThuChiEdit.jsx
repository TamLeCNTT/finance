import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ThuchiService from "../../service/ThuchiService";
const ThuChiEdit = (props) => {
  const [name, setname] = useState();
  const [listPaid, setListPaid] = useState([]);

  const [paid, setPaid] = useState({});
  const [show, setshow] = useState(false);
  const [soluong, setsoluong] = useState(0);
  const [content, setcontent] = useState("");
  const [date, setdate] = useState("");
  const [state, setstate] = useState("");
  let navitive = useNavigate();
  const makeid = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };
  const save = (e) => {
    if (!date) toast.error("Vui lòng chọn ngày");
    else {
      if (!soluong) toast.error("Vui lòng nhập số lượng");
      else if (!content) toast.error("Vui lòng nhập nội dung");
      else {
        let paids = {
          id: props.id,
          content: content,
          date: date,
          quantity: soluong,
          status: Number(state) + 1,
        };
        let listpadNew = listPaid;
        let index = listpadNew.findIndex((item) => item.id == props.id);
        listpadNew[index] = paids;
        console.log(index, listpadNew[index], paid, paids, listpadNew);
        ThuchiService.update({
          name: Number(state) + 1,
          data: listpadNew,
        }).then((ress) => {
          toast.success("Cập nhật thành công");
          props.savedata();
          setshow(false);
        });
      }
    }
  };
  const openModal = () => {
    console.log(props.id, props.status);
    ThuchiService.getbyid(props.status).then((res) => {
      setPaid(res.data.data.filter((item) => item.id == props.id)[0]);
      let paids = res.data.data.filter((item) => item.id == props.id)[0];
      setListPaid(res.data.data);
      setcontent(paids.content);
      setdate(paids.date);
      setsoluong(paids.quantity);
      setstate(paids.status - 1);
    });
    setshow(true);
  };
  const changedate = (e) => {
    setdate(e.target.value);
    console.log(e.target.value);
  };
  const changecontent = (e) => {
    setcontent(e.target.value);
  };
  const changesoluong = (e) => {
    setsoluong(e.target.value);
  };
  const changestate = (e) => {
    setstate(e.target.value);
  };
  return (
    <>
      <a
        href="#"
        className="edit"
        data-dismiss="alert"
        aria-label="edit"
        onClick={() => openModal()}
      >
        <input type="button" className="btn btn-primary " value={"edit"} />
      </a>

      <Modal
        show={show}
        onHide={() => setshow(false)}
        dialogClassName="modal-90w modal_show"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h1 id="title" className="text-center">
              Add finance
            </h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section id="about" className="about">
            <div className="container" data-aos="fade-up">
              <div className="row">
                <div className="col col-md-6">
                  <div className="md-4">
                    <label className="form-label" htmlFor="date">
                      Ngày
                    </label>
                    <input
                      className="form-control"
                      id="date"
                      name="location"
                      onChange={(e) => changedate(e)}
                      value={date}
                      type="date"
                      placeholder="Tên giáo viên"
                    />
                  </div>
                </div>
                <div className="col col-md-6">
                  <div className="md-4">
                    <label htmlFor="number" className="form-label">
                      Số lượng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      onChange={(e) => changesoluong(e)}
                      value={soluong}
                      placeholder="Số lượng"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col col-md-6">
                  <div className="md-4">
                    <label className="form-label" htmlFor="content">
                      Nội dung
                    </label>
                    <input
                      className="form-control"
                      id="content"
                      name="location"
                      onChange={(e) => changecontent(e)}
                      value={content}
                      type="text"
                      placeholder="Nội dung"
                    />
                  </div>
                </div>
                <div className="col col-md-6">
                  <div className="md-4">
                    <label htmlFor="number" className="form-label">
                      Trạng thái
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) => changestate(e)}
                      value={state}
                    >
                      <option value="" hidden>
                        Chọn trạng thái
                      </option>
                      <option value="0">Nhập</option>
                      <option value="1">Gửi</option>

                      <option value="2">Hoàn thành</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col col-md-4 offset-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary mt-4 w-100 btn-lg p-4"
                    onClick={(e) => save(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ThuChiEdit;
