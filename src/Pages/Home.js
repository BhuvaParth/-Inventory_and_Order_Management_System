import React, { useEffect, useState } from "react";
import AdminDashboard from "../Containers/Dashboard/AdminDashboard";
import CustomerDashboard from "../Containers/Dashboard/CustomerDashboard";

export default function Home() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const loggedInUser = existingUsers.find((user) => user.isLoggedIn);

    if (loggedInUser) {
      setUserRole(loggedInUser.role); 
    }
  }, []);

  return (
    <div>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "customer" ? (
        <CustomerDashboard />
      ) : (
        <p>Please log in to access the dashboard.</p>
      )}
    </div>
  );
}
