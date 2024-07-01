const Class = require("../models/class");
const Teacher = require("../models/teacher");

const getMonthlyExpenses = async (req, res) => {
  try {
    const classes = await Class.find();
    const teachers = await Teacher.find();

    let teacherSalaries = 0;
    let studentFees = 0;

    teachers.forEach((teacher) => {
      teacherSalaries += teacher.salary;
    });

    classes.forEach((classItem) => {
      studentFees += classItem.studentFees;
    });

    res.status(200).json({
      monthly: {
        teacherSalaries,
        studentFees,
      },
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const getYearlyExpenses = async (req, res) => {
  try {
    const classes = await Class.find();
    const teachers = await Teacher.find();

    let teacherSalaries = 0;
    let studentFees = 0;

    teachers.forEach((teacher) => {
      teacherSalaries += teacher.salary * 12;
    });

    classes.forEach((classItem) => {
      studentFees += classItem.studentFees * 12;
    });

    res.status(200).json({
      yearly: {
        teacherSalaries,
        studentFees,
      },
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

module.exports = {
  getMonthlyExpenses,
  getYearlyExpenses,
};
