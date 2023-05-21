import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Loginpage from "./Pages/Login";
import Register from "./Pages/Register";
import Rental from "./Pages/Rental";
import Userbookings from "./Pages/userbookings";
import Addproduct from './Pages/Addproduct';
import Adminhomepage from "./Pages/Adminhome";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Loginpage />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/Rental/:productid"
            element={
              <ProtectedRoute>
                <Rental />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userbookings"
            element={
              <ProtectedRoute>
                <Userbookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <Addproduct />
              </ProtectedRoute>
            }
          />
           <Route
            path="/editproduct/:productid"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
           <Route
            path="/adminpage"
            element={
              <ProtectedRoute>
                <Adminhomepage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/Login" replace />;
  }
  return children;
}
