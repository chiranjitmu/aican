const Teacher = require("../models/teacher");
const yup = require("yup");

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
  dob: yup.string().required(),
  contact: yup.string().required(),
  salary: yup.number().required(),
  assignedClass: yup.string().required(),
});

const createTeacher = async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, assignedClass } = req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        salary,
        assignedClass,
      },
      { abortEarly: false }
    );

    const newTeacher = new Teacher({
      name,
      gender,
      dob,
      contact,
      salary,
      assignedClass,
    });

    const savedTeacher = await newTeacher.save();

    res.status(201).json(savedTeacher);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errorMessage: "validation Error" });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};

const getTeacher = async (req, res) => {
  try {
    const { page } = req.params;

    const pageNum = parseInt(page, 10);
    const limitNum = 4;

    const skip = (pageNum - 1) * limitNum;

    const teacher = await Teacher.find().skip(skip).limit(limitNum);

    if (!teacher || teacher.length === 0) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }

    const totalTeacher = await Teacher.countDocuments();

    const totalPages = Math.ceil(totalTeacher / limitNum);

    res.status(200).json({
      teacher,
      totalPages,
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, dob, contact, salary, assignedClass } = req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        salary,
        assignedClass,
      },
      { abortEarly: false }
    );

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          gender,
          dob,
          contact,
          salary,
          assignedClass,
        },
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errorMessage: "Validation Error" });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { Id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(Id);

    if (!teacher) {
      return res.status(404).json({ errorMessage: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

module.exports = {
  createTeacher,
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
