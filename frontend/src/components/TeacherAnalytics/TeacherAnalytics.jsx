import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { deleteTeacher, getTeacher } from "../../api/teacher";
import CreateDetails from "../CreateDetails/CreateDetails";

const TeacherAnalytics = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editData, setEditData] = useState([]);
  const [editTrue, setEditTrue] = useState(false);

  // Function to fetch teachers with pagination
  const fetchData = async (page) => {
    const result = await getTeacher(page, navigate);
    setData(result.data.teacher);
    setCurrentPage(result.data.currentPage || 1);
    setTotalPages(result.data.totalPages);
  };

  const handleEdit = (i) => {
    setEditData(data[i]);
    setEditTrue(true);
  };

  const handleDelete = (id) => {
    setModal(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteTeacher(deleteId, navigate);
    if (result) {
      setModal(false);
      toast.success("Deleted Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      if (data.length === 1 && currentPage > 1) {
        fetchData(currentPage - 1);
      } else {
        fetchData(currentPage);
      }
    }
  };

  const handleModalCancel = () => {
    setModal(false);
    setDeleteId(null);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      fetchData(nextPage);
    }
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      fetchData(prevPage);
    }
  };

  const handleToggleEdit = () => {
    setEditTrue(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [editTrue]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!editTrue ? (
        <div className="p-6 bg-gray-100 min-h-full">
          <ToastContainer />
          <h1 className="text-2xl font-semibold mb-4">Teacher Analytics</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4">Date of Birth</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Salary</th>
                  <th className="p-4">Assigned Class</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id} className="border-t">
                    <td className="p-4">{(currentPage - 1) * 5 + index + 1}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.gender}</td>
                    <td className="p-4">{item.dob}</td>
                    <td className="p-4">{item.contact}</td>
                    <td className="p-4">{item.salary}</td>
                    <td className="p-4">{item.assignedClass}</td>
                    <td className="p-4">
                      <div className="flex space-x-5">
                        <span
                          onClick={() => handleEdit(index)}
                          className="cursor-pointer text-blue-600"
                        >
                          <FiEdit />
                        </span>
                        <span
                          onClick={() => handleDelete(item._id)}
                          className="cursor-pointer text-red-600"
                        >
                          <RiDeleteBin6Fill />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
            <div>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 mx-1 ${
                  currentPage === 1
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white"
                } rounded-md focus:outline-none`}
              >
                {"<"}
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 mx-1 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white"
                } rounded-md focus:outline-none`}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <CreateDetails
            editData={editData}
            editTrue={editTrue}
            setEditTrue={setEditTrue}
            formType="Teacher"
          />
          <p
            className="flex ml-[45%] mt-5 text-red-500 font-bold text-xl cursor-pointer"
            onClick={handleToggleEdit}
          >
            Back
          </p>
        </>
      )}
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Confirm Delete
              </button>
              <button
                onClick={handleModalCancel}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherAnalytics;
