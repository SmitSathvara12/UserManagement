import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashborad from "./pages/Dashborad";
import { useDispatch, useSelector } from "react-redux";
import CreateUser from "./pages/CreateUser";
import { useEffect } from "react";
import { loadUser } from "./features/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/ManageUsers";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
    console.log(user);
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login></Login> : <Dashborad />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Dashborad /> : <Login></Login>}
          />
          <Route
            path="/createUser"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageUser"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
