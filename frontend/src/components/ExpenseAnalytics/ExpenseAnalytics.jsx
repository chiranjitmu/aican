import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getMonthlyExpenses, getYearlyExpenses } from "../../api/analytics";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ExpenseAnalytics = () => {
  const [view, setView] = useState("monthly");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [yearlySalary, setYearlySalary] = useState("");
  const [monthlyStudentFees, setMonthlyStudentFees] = useState("");
  const [yearlyStudentFees, setYearlyStudentFees] = useState("");

  const [donutData, setDonutData] = useState({
    options: {
      labels: ["Teacher Expense", "Student Income"],
    },
    series: [0, 0],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (view === "monthly") {
        const response = await getMonthlyExpenses(navigate);
        if (response?.data) {
          const data = response.data.monthly;
          setDonutData((prevData) => ({
            ...prevData,
            series: [data.teacherSalaries, data.studentFees],
          }));
          setMonthlySalary(data.teacherSalaries);
          setMonthlyStudentFees(data.studentFees);
        }
      } else {
        const response = await getYearlyExpenses(navigate);
        if (response?.data) {
          const data = response.data.yearly;
          setDonutData((prevData) => ({
            ...prevData,
            series: [data.teacherSalaries, data.studentFees],
          }));
          setYearlySalary(data.teacherSalaries);
          setYearlyStudentFees(data.studentFees);
        }
      }
    };

    fetchData();
  }, [view, navigate]);

  return (
    <div>
      {view === "monthly" ? (
        <p className="text-2xl text-center font-medium">Monthly Data</p>
      ) : (
        <p className="text-2xl text-center font-medium">Yearly Data</p>
      )}
      <Chart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="500"
        className="flex justify-center mt-9"
      />
      <div>
        <p className="text-xl text-gray-500">
          Teacher Salary :{" "}
          {view === "monthly" ? (
            <span className="text-blue-500 font-semibold">{monthlySalary}</span>
          ) : (
            <span className="text-blue-500 font-semibold">{yearlySalary}</span>
          )}
        </p>
        <p className="text-xl  text-gray-500">
          Student Fees :{" "}
          {view === "monthly" ? (
            <span className="text-green-500 font-semibold">
              {monthlyStudentFees}
            </span>
          ) : (
            <span className="text-green-500 font-semibold">
              {yearlyStudentFees}
            </span>
          )}
        </p>
      </div>
      <div className="mt-10 flex justify-center gap-5">
        <button
          onClick={() => setView("monthly")}
          className="bg-gray-400 text-white p-3 rounded cursor-pointer"
        >
          Monthly View
        </button>
        <button
          onClick={() => setView("yearly")}
          className="bg-red-400 text-white p-3 rounded cursor-pointer"
        >
          Yearly View
        </button>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;
