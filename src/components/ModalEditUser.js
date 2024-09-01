import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { updateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = ({ showModal, hideModal, userDataEdit }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userID, setUserID] = useState(0);
  const [localShowModal, setLocalShowModal] = useState(showModal);
  const [loadingBtn, setLoadingBtn] = useState(false);
  console.log(userDataEdit);
  useEffect(() => {
    setLocalShowModal(showModal);
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      setEmail(userDataEdit.email);
      setFirstName(userDataEdit.first_name);
      setLastName(userDataEdit.last_name);
      setUserID(userDataEdit.id);
    }
  }, [userDataEdit]);

  const handleClose = () => {
    setLocalShowModal(false);
    if (hideModal) hideModal();
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (!email || !firstName || !lastName) {
      toast.error("Please enter email,firstname, lastname.");
      return;
    }
    try {
      let res = await updateUser(userID, firstName, email);
      if (res && res.data) {
        handleClose();
        toast.success("User has been updated!");
      }
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("There was an error creating the user. Please try again.");
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <Modal
      show={localShowModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditUser}>
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoFocus
              className="input-form-custom"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input-form-custom"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email..."
              className="input-form-custom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="form-control"
            disabled={loadingBtn}
          >
            {loadingBtn ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp; Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditUser;
