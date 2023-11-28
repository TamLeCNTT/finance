import "./App.css";
import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

///component
import Tests from "./component/Tests";
import ThuChiList from "./component/thuchi/ThuChiList";
///student
import StudentList from "./component/student/StudentList";
function App() {
  const dataRef = useRef();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Router of Student */}
        
            <Route path="/" element={<ThuChiList />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
           
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </header>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
