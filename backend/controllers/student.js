const Student = require("../models/student");
const yup = require("yup");

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
  dob: yup.string().required(),
  contact: yup.string().required(),
  feesPaid: yup.number().required(),
  assignedClass: yup.string().required(),
  refUserID: yup.string().required(),
});

const createStudent = async (req, res) => {
  try {
    const { name, gender, dob, contact, feesPaid, assignedClass, refUserID } =
      req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        feesPaid,
        assignedClass,
        refUserID,
      },
      { abortEarly: false }
    );

    const newStudent = new Student({
      name,
      gender,
      dob,
      contact,
      feesPaid,
      assignedClass,
      refUserID,
    });

    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errorMessage: "validation Error" });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};

const getMaleAndFemaleAnalytics = async (req, res) => {
  const { userId, className } = req.params;

  try {
    const students = await Student.find({
      refUserID: userId,
      assignedClass: className,
    });

    let maleCount = 0;
    let femaleCount = 0;

    await Promise.all(
      students.map(async (student) => {
        const genderUpperCase = student.gender.toUpperCase();
        if (genderUpperCase === "MALE") {
          maleCount++;
        } else if (genderUpperCase === "FEMALE") {
          femaleCount++;
        }
      })
    );

    const analytics = {
      maleCount,
      femaleCount,
      totalStudents: students.length,
    };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getMaleAndFemaleAnalytics,
};
