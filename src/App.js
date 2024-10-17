import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Containers/Auth/Login";
import Signup from "./Containers/Auth/Signup";
import Home from "./Pages/Home";
import Header from "./Containers/Header";
import AdminDashboard from "./Containers/Dashboard/AdminDashboard";
import AddProduct from "./Containers/Forms/AddProduct";
import EditProduct from "./Containers/Forms/EditeProduct";
import Cart from "./Containers/Cart";
import PlacerOrder from "./Containers/Order/PlacerOrder";
import YourOrder from "./Containers/Order/YourOrder";
import AdminOrder from "./Containers/Order/AdminOrder";
import CustomerDashboard from "./Containers/Dashboard/CustomerDashboard";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))?.find(
      (user) => user.isLoggedIn
    ) || null
  );

  const location = useLocation(); 

  const handleLogin = (email) => {
    const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const loggedInUser = existingUsers.find((user) => user.email === email);
    setUserData(loggedInUser);
  };

  const handleLogout = () => {
    const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedUsers = existingUsers.map((user) =>
      user.isLoggedIn ? { ...user, isLoggedIn: false } : user
    );
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
    setUserData(null);
  };

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="App">
      {!hideHeader && (
        <Header userData={userData} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            userData ? (
              <Home handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/custmerdashboard" element={<CustomerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlacerOrder />} />
        <Route path="/yourorder" element={<YourOrder />} />
        <Route path="/adminorder" element={<AdminOrder />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
