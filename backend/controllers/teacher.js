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
  refUserID: yup.string().required(),
});

const createTeacher = async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, assignedClass, refUserID } =
      req.body;

    await schema.validate(
      {
        name,
        gender,
        dob,
        contact,
        salary,
        assignedClass,
        refUserID,
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
      refUserID,
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

module.exports = {
  createTeacher,
};
