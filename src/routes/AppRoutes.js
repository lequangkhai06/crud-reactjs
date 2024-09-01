import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/users"
          element={
            <PrivateRoute path="/users">
              <TableUsers />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
