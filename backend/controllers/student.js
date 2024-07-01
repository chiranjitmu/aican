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
});

const createStudent = async (req, res) => {
  try {
    const { name, gender, dob, contact, feesPaid, assignedClass } = req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        feesPaid,
        assignedClass,
      },
      { abortEarly: false }
    );

    // Check if the count of existing classes with the same className exceeds 60
    const countLimit = await Student.countDocuments({
      assignedClass,
    });
    if (countLimit > 60) {
      return res
        .status(400)
        .json({ errorMessage: "Class limit exceeded (max 60)." });
    }

    const newStudent = new Student({
      name,
      gender,
      dob,
      contact,
      feesPaid,
      assignedClass,
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
  const { className } = req.params;

  try {
    const students = await Student.find({
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

const getStudent = async (req, res) => {
  try {
    const { page } = req.params;

    const pageNum = parseInt(page, 10);
    const limitNum = 4;

    const skip = (pageNum - 1) * limitNum;

    const student = await Student.find().skip(skip).limit(limitNum);

    if (!student || student.length === 0) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }

    const totalStudent = await Student.countDocuments();

    const totalPages = Math.ceil(totalStudent / limitNum);

    res.status(200).json({
      student,
      totalPages,
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, dob, contact, feesPaid, assignedClass } = req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        feesPaid,
        assignedClass,
      },
      { abortEarly: false }
    );

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          gender,
          dob,
          contact,
          feesPaid,
          assignedClass,
        },
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errorMessage: "Validation Error" });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { Id } = req.params;

    const student = await Student.findByIdAndDelete(Id);

    if (!student) {
      return res.status(404).json({ errorMessage: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

module.exports = {
  createStudent,
  getMaleAndFemaleAnalytics,
  getStudent,
  deleteStudent,
  updateStudent,
};
