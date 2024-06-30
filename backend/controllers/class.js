const Class = require("../models/class");
const yup = require("yup");

// Yup validation schema
const schema = yup.object().shape({
  className: yup.string().required(),
  year: yup.number().required(),
  teacher: yup.string().required(),
  studentFees: yup.number().required(),
  studentList: yup.number().required(),
  refUserID: yup.string().required(),
});

const createClass = async (req, res) => {
  try {
    const { className, year, teacher, studentFees, studentList, refUserID } =
      req.body;

    await schema.validate(
      {
        className,
        year,
        teacher,
        studentFees,
        studentList,
        refUserID,
      },
      { abortEarly: false }
    );

    // Check if the count of existing classes with the same className exceeds 60
    const countLimit = await Class.countDocuments({
      className,
      refUserID: refUserID,
    });
    if (countLimit >= 60) {
      return res
        .status(400)
        .json({ errorMessage: "Class limit exceeded (max 60)." });
    }

    const newClass = new Class({
      className,
      year,
      teacher,
      studentFees,
      studentList,
      refUserID,
    });

    const savedClass = await newClass.save();

    res.status(201).json(savedClass);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errorMessage: "validation Error" });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};

const getClass = async (req, res) => {
  try {
    const { userId, page } = req.params;

    const pageNum = parseInt(page, 10);
    const limitNum = 4;

    const skip = (pageNum - 1) * limitNum;

    const classes = await Class.find({ refUserID: userId })
      .skip(skip)
      .limit(limitNum);

    if (!classes || classes.length === 0) {
      return res.status(404).json({ errorMessage: "Classes not found" });
    }

    const totalClasses = await Class.countDocuments({ refUserID: userId });

    const totalPages = Math.ceil(totalClasses / limitNum);

    res.status(200).json({
      classes,
      totalPages,
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { Id } = req.params;

    const classes = await Class.findByIdAndDelete(Id);

    if (!classes) {
      return res.status(404).json({ errorMessage: "Classes not found" });
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
module.exports = {
  createClass,
  getClass,
  deleteClass,
};
