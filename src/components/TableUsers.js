import { useEffect, useState, useRef } from "react";
import { fetchAllUser } from "../services/UserService";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ConfirmModal from "./ConfirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userDataEdit, setUserDataEdit] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái tìm kiếm
  const [tableLoading, setTableLoading] = useState(false);

  // import file
  const fileInputRef = useRef(null);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);
  const handleHideEditModal = () => setShowEditModal(false);
  const handleHideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    getUsers(1);
  }, []);

  useEffect(() => {
    filterUsers(searchTerm); // Lọc danh sách người dùng khi searchTerm thay đổi
  }, [searchTerm, listUsers]);

  const getUsers = async (page) => {
    setTableLoading(true);
    let res = await fetchAllUser(page);
    if (res && res.data && res.data.data) {
      setTableLoading(false);
      setTotalUsers(res.data.total);
      setListUsers(res.data.data);
      setTotalPages(res.data.total_pages);
      filterUsers(searchTerm); // Lọc danh sách người dùng sau khi tải dữ liệu
    }
  };

  const filterUsers = (term) => {
    if (!term) {
      setDisplayedUsers(listUsers);
    } else {
      const filtered = listUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.first_name.toLowerCase().includes(term.toLowerCase()) ||
          user.last_name.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayedUsers(filtered);
    }
  };

  const handlePageClick = (event) => {
    const page = +event.selected;
    getUsers(page + 1);
  };

  const handleEditUser = (data) => {
    setUserDataEdit(data);
    setShowEditModal(true);
  };

  const handleDeleteUser = (data) => {
    setUserDataEdit(data);
    setShowConfirmModal(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleImportFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Xử lý file CSV ở đây
      console.log("Selected file:", file);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center mb-2 py-3">
        <h2>List User</h2>
        <div className="ms-auto d-flex">
          <Button
            className="btn-sm btn btn-warning ms-2"
            onClick={handleImportFile}
          >
            <FontAwesomeIcon icon="fa-solid fa-file-csv" />
            &nbsp;Import CSV
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <CSVLink className="btn-sm btn btn-success ms-2" data={listUsers}>
            <FontAwesomeIcon icon="fa-solid fa-file-csv" />
            &nbsp;Export CSV
          </CSVLink>
          <Button
            className="btn-sm btn btn-primary ms-2"
            onClick={handleShowModal}
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" />
            &nbsp;Add User
          </Button>
        </div>
      </div>
      <Form.Control
        type="search"
        placeholder="Search users..."
        className="me-2 mb-3"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ModalAddUser showModal={showModal} hideModal={handleHideModal} />
      <ModalEditUser
        showModal={showEditModal}
        hideModal={handleHideEditModal}
        userDataEdit={userDataEdit}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        hideModal={handleHideConfirmModal}
        userDataEdit={userDataEdit}
      />
      {tableLoading ? (
        <>
          <div className="text-center">
            <Spinner animation="border" className="text-primary" />
            <p className="mt-2">Loading data...</p>
          </div>
        </>
      ) : (
        ""
      )}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length > 0 &&
            displayedUsers.map((item, index) => (
              <tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="primary"
                      type="submit"
                      className="me-1 btn-sm"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="»"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="«"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default TableUsers;
