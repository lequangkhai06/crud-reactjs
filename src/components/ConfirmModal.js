import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

const ConfirmModal = ({ showModal, hideModal, userDataEdit }) => {
  const [userID, setUserID] = useState(0);
  const [email, setEmail] = useState("");
  const [localShowModal, setLocalShowModal] = useState(showModal);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    setLocalShowModal(showModal);
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      setEmail(userDataEdit.email);
      setUserID(userDataEdit.id);
    }
  }, [userDataEdit]);

  const handleClose = () => {
    setLocalShowModal(false);
    if (hideModal) hideModal();
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (!userID) {
      toast.error("Please enter user id.");
      return;
    }
    try {
      let res = await deleteUser(userID);
      handleClose();
      toast.success("Deleted user!");
    } catch (error) {
      console.error("Error deleting user:", error);
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
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleDeleteUser}>
          <Alert variant="primary">
            <strong>
              Are you sure you want to delete user email: {email}?
            </strong>
          </Alert>
          <Button
            variant="danger"
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
              "Delete now"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;