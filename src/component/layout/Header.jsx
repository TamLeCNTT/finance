
import { NavLink } from "react-router-dom";
import './Layout.scss'
import '../../Assets/scss/Layout.scss'
import logo from '../../Assets/img/logo.png'
import { connect } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Header = (props) => {
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const dangxuat = () => {
        localStorage.removeItem("user")
        toast.success("Đăng xuất thành công")
        props.logout()
    }
    useEffect(() => {
        console.log(props.dataRedux)
    }, [])
    return (
        <>
            <header className="header">
                <nav className="navbar header-nav navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand header-logo" href="#">
                            <img className="logo" src={logo} alt="hung thinh" />
                            <span className="header-subtitle-logo " >
                                {/* <span className="d-flex justify-content-center align-items-center" >Trung Tâm GDNN-ĐTLX</span>
                                <span className="d-flex justify-content-center align-items-center" >Hưng Thịnh</span> */}
                            </span>
                        </a>
                        <button
                            className="navbar-toggler btn-menu-mobile"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon">
                                <i className="fa-solid fa-bars"></i>
                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Trang chủ</NavLink>
                                </li>


                                <li className="nav-item">

                                    <a className="nav-link" href="#">Lịch học</a>
                                    <ul className="sub-nav modal-90w">
                                        <li className="sub-item">
                                            <NavLink to="/cabin/show" className="sub-content">Lịch cabin</NavLink> </li>
                                        <li className="sub-item"><a href="" className="sub-content">Lịch thi tốt nghiệp</a></li>
                                        <li className="sub-item"><a href="" className="sub-content">Lịch thi sát hạch</a></li>
                                    </ul>
                                </li>


                                <li className="nav-item">
                                    <a className="nav-link" href="#">Ôn tập</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Khoá học</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Giới thiệu</a>
                                </li>
                                {
                                    !props.dataRedux.user.username && !users && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Đăng nhập</NavLink>
                                        </li>
                                    )
                                }

                                {(props.dataRedux.user.username || users) && (
                                    <li className="nav-item">

                                        <a className="nav-link" href="#">Quản lý</a>
                                        <ul className="sub-nav">
                                            <li className="sub-item">
                                                <NavLink onClick={() => dangxuat()} className="sub-content">Đăng xuất</NavLink>

                                            </li>
                                            <li className="sub-item"> <NavLink to="/cabin/list" className="sub-content">Lịch cabin</NavLink>
                                            </li>
                                            <li className="sub-item"> <NavLink to="/cabin/add" className="sub-content">Đăng ký cabin</NavLink></li>
                                            <li className="sub-item"> <NavLink to="/giaovien/list" className="sub-content">Giáo viên </NavLink>
                                            </li>
                                            <li className="sub-item"> <NavLink to="/student/list" className="sub-content">Học viên </NavLink>
                                            </li>
                                            <li className="sub-item"> <NavLink to="/session/list" className="sub-content">Kiểm tra DAT</NavLink></li>
                                            <li className="sub-item"> <NavLink to="/cohuu/list" className="sub-content">DAT cơ hữu</NavLink></li>
                                        </ul>
                                    </li>
                                )




                                }
                            </ul>

                            <ul className="navbar-nav nav-right me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button
                                        className="btn btn-contact active"
                                        aria-current="page"
                                        href="#"
                                    >
                                        Liên hệ
                                    </button>
                                </li>


                                <li className="nav-item nav-phone">
                                    <a href="tel:0123456789" className="header-phone">
                                        <i className="fas fa-phone-alt"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>

        </>
    );
};
const mapStateToProps = (state) => {
    return { dataRedux: state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: "LOGOUT" }),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
