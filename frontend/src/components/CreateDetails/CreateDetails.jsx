import React, { useEffect, useState } from "react";
import { createClass, updateClass } from "../../api/class";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../api/student";
import { createTeacher } from "../../api/teacher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

const CreateDetails = ({ formType, editTrue, editData, setEditTrue }) => {
  const navigate = useNavigate();

  // Validation schemas for each form type
  const classSchema = yup.object().shape({
    className: yup.string().required("Class Name is required"),
    year: yup.number().required("Year is required"),
    teacher: yup.string().required("Teacher Name is required"),
    studentFees: yup.number().required("Student Fees is required"),
    studentList: yup.number().required("Student List is required"),
  });

  const teacherSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of Birth is required"),
    contact: yup.string().required("Contact Details are required"),
    salary: yup.number().required("Salary is required"),
    assignedClass: yup.string().required("Assigned Class is required"),
  });

  const studentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of Birth is required"),
    contact: yup.string().required("Contact Details are required"),
    feesPaid: yup.number().required("Fees Paid is required"),
    assignedClass: yup.string().required("Assigned Class is required"),
  });

  // State variables for form data
  const [classFormData, setClassFormData] = useState({
    className: "",
    year: "",
    teacher: "",
    studentFees: "",
    studentList: "",
  });

  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
    assignedClass: "",
  });

  const [studentFormData, setStudentFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contact: "",
    feesPaid: "",
    assignedClass: "",
  });

  useEffect(() => {
    setClassFormData({
      className: editData?.className || "",
      year: editData?.year?.toString() || "",
      teacher: editData?.teacher || "",
      studentFees: editData?.studentFees?.toString() || "",
      studentList: editData?.studentList?.toString() || "",
    });
  }, [editData]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (formType) {
      case "Class":
        setClassFormData({
          ...classFormData,
          [name]: value,
        });
        break;
      case "Teacher":
        setTeacherFormData({
          ...teacherFormData,
          [name]: value,
        });
        break;
      case "Student":
        setStudentFormData({
          ...studentFormData,
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastOptions = {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };

    switch (formType) {
      case "Class":
        await classSchema.validate(classFormData);
        if (editTrue && editData?._id) {
          await updateClass(editData._id, classFormData, navigate);
          toast.success("Class updated successfully", toastOptions);
          setTimeout(() => {
            setEditTrue(false);
          }, 2500);
        } else {
          const result = await createClass(classFormData, navigate);
          if (result) {
            toast.success("Class created successfully", toastOptions);
          }
        }
        setClassFormData({
          className: "",
          year: "",
          teacher: "",
          studentFees: "",
          studentList: "",
        });
        break;

      case "Teacher":
        await teacherSchema.validate(teacherFormData);
        const result2 = await createTeacher(teacherFormData, navigate);
        if(result2){
          toast.success("Teacher created successfully", toastOptions);
        }
        setTeacherFormData({
          name: "",
          gender: "",
          dob: "",
          contact: "",
          salary: "",
          assignedClass: "",
        });
        break;

      case "Student":
        await studentSchema.validate(studentFormData);
        const result3 = await createStudent(studentFormData, navigate);
        if(result3){
          toast.success("Student created successfully", toastOptions);
        }
       
        setStudentFormData({
          name: "",
          gender: "",
          dob: "",
          contact: "",
          feesPaid: "",
          assignedClass: "",
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="max-w-[50%] bg-white rounded-lg overflow-hidden shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{`Create ${formType}`}</h2>
        <form onSubmit={handleSubmit}>
          {formType === "Class" && (
            <>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Class Name :
                </label>
                <input
                  type="text"
                  name="className"
                  value={classFormData.className}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Year :
                </label>
                <input
                  type="number"
                  name="year"
                  value={classFormData.year}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Teacher :
                </label>
                <input
                  type="text"
                  name="teacher"
                  value={classFormData.teacher}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Student Fees :
                </label>
                <input
                  type="number"
                  name="studentFees"
                  value={classFormData.studentFees}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Student List :
                </label>
                <input
                  type="number"
                  name="studentList"
                  value={classFormData.studentList}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
            </>
          )}

          {formType === "Teacher" && (
            <>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={teacherFormData.name}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Gender :
                </label>
                <input
                  type="text"
                  name="gender"
                  value={teacherFormData.gender}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Date of Birth :
                </label>
                <input
                  type="date"
                  name="dob"
                  value={teacherFormData.dob}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Contact :
                </label>
                <input
                  type="text"
                  name="contact"
                  value={teacherFormData.contact}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Salary :
                </label>
                <input
                  type="number"
                  name="salary"
                  value={teacherFormData.salary}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Assigned Class :
                </label>
                <input
                  type="text"
                  name="assignedClass"
                  value={teacherFormData.assignedClass}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
            </>
          )}

          {formType === "Student" && (
            <>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentFormData.name}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Gender :
                </label>
                <input
                  type="text"
                  name="gender"
                  value={studentFormData.gender}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Date of Birth :
                </label>
                <input
                  type="date"
                  name="dob"
                  value={studentFormData.dob}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Contact :
                </label>
                <input
                  type="text"
                  name="contact"
                  value={studentFormData.contact}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Fees Paid :
                </label>
                <input
                  type="number"
                  name="feesPaid"
                  value={studentFormData.feesPaid}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">
                  Assigned Class :
                </label>
                <input
                  type="text"
                  name="assignedClass"
                  value={studentFormData.assignedClass}
                  onChange={handleChange}
                  className="mt-1 text-md block w-[60%] border-b-2 outline-none rounded-md"
                />
              </div>
            </>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {editTrue ? "Update" : "Create"} {formType}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateDetails;
