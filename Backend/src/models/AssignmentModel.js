const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
  },
  { _id: false },
);

const tableSchema = new mongoose.Schema(
  {
    tableName: String,
    columns: [columnSchema],
    rows: [{ type: Object }],
  },
  { _id: false },
);

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    tables: [{ type: String, required: true }],
    sampleData: [tableSchema],
  },
  { timestamps: true },
);

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

module.exports = AssignmentModel;
