import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddUser = ({ showModal, hideModal }) => {
  const [job, setJob] = useState("");
  const [name, setName] = useState("");
  const [localShowModal, setLocalShowModal] = useState(showModal);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    setLocalShowModal(showModal);
  }, [showModal]);

  const handleClose = () => {
    setLocalShowModal(false);
    if (hideModal) hideModal();
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (!name || !job) {
      toast.error("Please fill in both name and job fields.");
      return;
    }
    try {
      let res = await createUser(name, job);
      if (res && res.data && res.data.id) {
        handleClose();
        setName("");
        setJob("");
        toast.success("User created!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
        <Modal.Title>Add new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateUser}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter job..."
              value={job}
              onChange={(e) => setJob(e.target.value)}
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
              "Save changes"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddUser;
