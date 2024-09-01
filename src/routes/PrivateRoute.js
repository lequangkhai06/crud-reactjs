import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Please Login!!!</Alert.Heading>
          <p>You don't have permission to access this route.</p>
          <button className="btn btn-danger" onClick={() => navigate("/login")}>
            Login here
          </button>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
