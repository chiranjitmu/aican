import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassAnalytics from "../../components/ClassAnalytics/ClassAnalytics";
import ExpenseAnalytics from "../../components/ExpenseAnalytics/ExpenseAnalytics";
import CreateDetails from "../../components/CreateDetails/CreateDetails";
import { IoMdArrowDropdown } from "react-icons/io";
import TeacherAnalytics from "../../components/TeacherAnalytics/TeacherAnalytics";
import StudentAnalytics from "../../components/StudentAnalytics/StudentAnalytics";

const Home = () => {
  const navigate = useNavigate();
  const classAnalyticsRef = useRef(null);
  const teacherAnalyticsRef = useRef(null);
  const studentAnalyticsRef = useRef(null);
  const expenseAnalyticsRef = useRef(null);
  const createSectionRef = useRef(null);
  const [open, setOpen] = useState("ClassAnalytics");
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const refs = [
      classAnalyticsRef,
      expenseAnalyticsRef,
      createSectionRef,
      studentAnalyticsRef,
      teacherAnalyticsRef,
    ];

    refs.forEach((ref) => {
      if (ref.current) {
        if (ref.current.id === open) {
          ref.current.classList.add("shadow-lg");
        } else {
          ref.current.classList.remove("shadow-lg");
        }
      }
    });
  }, [open]);

  const handleCreateToggle = () => {
    setCreateOpen(!createOpen);
  };

  const handleCreateOptionClick = (option) => {
    setOpen(option);
    setCreateOpen(false);
  };

  let sectionContent = null;

  switch (open) {
    case "ClassAnalytics":
      sectionContent = <ClassAnalytics />;
      break;
    case "TeacherAnalytics":
      sectionContent = <TeacherAnalytics />;
      break;
    case "StudentAnalytics":
      sectionContent = <StudentAnalytics />;
      break;
    case "ExpenseAnalytics":
      sectionContent = <ExpenseAnalytics />;
      break;
    case "CreateClass":
      sectionContent = <CreateDetails formType={"Class"} />;
      break;
    case "CreateTeacher":
      sectionContent = <CreateDetails formType={"Teacher"} />;
      break;
    case "CreateStudent":
      sectionContent = <CreateDetails formType={"Student"} />;
      break;
    default:
      sectionContent = null;
  }

  const handleLogout = () => {
    navigate("/auth");
    localStorage.removeItem("token");
  };

  return (
    <main className="flex">
      {/* left navbar section */}
      <aside className="w-full md:w-[25%] p-4 bg-gray-100 h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-xl text-[#ff6d2c] font-bold text-center">
            School Management Dashboard
          </h1>

          <ul className="space-y-4 mt-10 flex flex-col items-center">
            <li
              ref={classAnalyticsRef}
              id="ClassAnalytics"
              className="text-[#474444] font-semibold bg-white transition-shadow duration-1000 ease-in-out w-[70%] p-2 px-6 rounded-lg cursor-pointer"
              onClick={() => setOpen("ClassAnalytics")}
            >
              Class Analytics
            </li>
            <li
              ref={teacherAnalyticsRef}
              id="TeacherAnalytics"
              className="text-[#474444] font-semibold bg-white transition-shadow duration-1000 ease-in-out w-[70%] p-2 px-6 rounded-lg cursor-pointer"
              onClick={() => setOpen("TeacherAnalytics")}
            >
              Teacher Analytics
            </li>
            <li
              ref={studentAnalyticsRef}
              id="StudentAnalytics"
              className="text-[#474444] font-semibold bg-white transition-shadow duration-1000 ease-in-out w-[70%] p-2 px-6 rounded-lg cursor-pointer"
              onClick={() => setOpen("StudentAnalytics")}
            >
              Student Analytics
            </li>
            <li
              ref={expenseAnalyticsRef}
              id="ExpenseAnalytics"
              className="text-[#474444] font-semibold bg-white transition-shadow duration-1000 ease-in-out w-[70%] p-2 px-6 rounded-lg cursor-pointer"
              onClick={() => setOpen("ExpenseAnalytics")}
            >
              Expense Analytics
            </li>
            {/* Create Section with Dropdown */}
            <li
              ref={createSectionRef}
              id="CreateSection"
              className="relative text-[#474444] font-semibold bg-white transition-shadow duration-1000 ease-in-out w-[70%] p-2 px-6 rounded-lg cursor-pointer"
            >
              <div
                onClick={handleCreateToggle}
                className="flex items-center justify-between"
              >
                Create
                <span>
                  <IoMdArrowDropdown />
                </span>
              </div>

              {/* Dropdown Content */}
              {createOpen && (
                <ul className="absolute left-0 mt-5 py-2 bg-white shadow-lg rounded-lg w-full">
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleCreateOptionClick("CreateClass")}
                  >
                    Create Class
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2  border-t-2 hover:bg-gray-200"
                    onClick={() => handleCreateOptionClick("CreateTeacher")}
                  >
                    Create Teacher
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 border-t-2 hover:bg-gray-200"
                    onClick={() => handleCreateOptionClick("CreateStudent")}
                  >
                    Create Student
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div>
          <hr className="mb-4 text-black h-2" />
          <button
            onClick={handleLogout}
            className="text-[#474444] font-semibold bg-white shadow-lg transition-shadow duration-1000 ease-in-out p-2 px-6 rounded-lg cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </aside>
      {/* right section */}
      <section className="flex-1 p-4 hidden md:block">{sectionContent}</section>
    </main>
  );
};

export default Home;
