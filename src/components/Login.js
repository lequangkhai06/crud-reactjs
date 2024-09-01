import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import { userLogin } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, loginContext } = useContext(UserContext);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    document.title = "Login";
    if (user.auth || localStorage.getItem("token")) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (email && password) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisabledBtn(true);
    setError("");
    try {
      const res = await userLogin(email, password);
      if (res?.data?.token) {
        toast.success("Login success!");
        loginContext(email, res.data.token);
        navigate("/");
      } else {
        setError("Invalid login token");
      }
    } catch (err) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
      setDisabledBtn(false);
    }
  };
  const handleSendEmail = async (e) => {
    toast.success("Email sent!");
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <Row className="w-100">
          <Col xs={12} md={8} lg={5} className="mx-auto">
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="input-form-custom"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-form-custom"
                  required
                />
              </Form.Group>
              <p onClick={handleShowModal}>Forgot password?</p>
              <div className="mt-3"></div>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={disabledBtn}
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  minHeight: "40px",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    &nbsp;Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="input-form-custom"
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <div className="mt-3"></div>
            <Button
              variant="primary"
              type="submit"
              className="form-control"
              onClick={handleSendEmail}
            >
              Next step
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
