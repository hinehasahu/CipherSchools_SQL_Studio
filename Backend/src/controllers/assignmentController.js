const AssignmentModel = require("../models/AssignmentModel");

const getAssignments = async (req, res) => {
  try {
    const allAssignments = await AssignmentModel.find();
    res
      .status(200)
      .json({ message: "Fetched All Assignments.", allAssignments });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await AssignmentModel.findById(id);
    res.status(200).json({ message: "Fetched assignment by Id", assignment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

const addAssignments = async (req, res) => {
  try {
    const newAssignment = await AssignmentModel.create(req.body);
    res
      .status(201)
      .json({ message: "Assignment added to the list.", newAssignment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

module.exports = { getAssignments, getAssignmentById, addAssignments };
