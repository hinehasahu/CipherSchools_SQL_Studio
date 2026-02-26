const { pool } = require("../configs/postgreSql");
const AssignmentModel = require("../models/AssignmentModel");

const executeQuestion = async (req, res) => {
  const { query } = req.body;
  const { assignmentId } = req.params;

  const assignment = await AssignmentModel.findById(assignmentId);

  const workspace = `workspace_${assignmentId}_${Date.now()}`;

  if (!assignment)
    return res.status(404).json({ message: "Assignment not found." });

  if (!query) return res.status(400).json({ message: "Query is required." });

  try {
    await pool.query(`CREATE SCHEMA ${workspace}`);

    await pool.query(`SET search_path TO ${workspace}`);

    for (let table of assignment.sampleData) {
      const columns = table.columns
        .map((col) => `${col.name} ${col.type}`)
        .join(",");

      await pool.query(`CREATE TABLE ${table.tableName} (${columns})`);
    }

    for (let table of assignment.sampleData) {
      for (let row of table.rows) {
        const keys = Object.keys(row).join(",");
        const values = Object.values(row)
          .map((val) => `'${val}'`)
          .join(",");

        await pool.query(
          `INSERT INTO ${table.tableName} (${keys}) VALUES (${values})`,
        );
      }
    }

    const forbidden = ["DROP", "DELETE", "TRUNCATE", "ALTER"];
    const upperQuery = query.toUpperCase();

    for (let word of forbidden) {
      if (upperQuery.includes(word))
        return res.status(403).json({ message: "Forbidden query" });
    }

    const result = await pool.query(query);

    res
      .status(200)
      .json({ message: "Executed successfully.", result: result.rows });

    await pool.query(`DROP SCHEMA ${workspace} CASCADE`);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: "Execution failed." });
    console.log(error);
  }
};

module.exports = executeQuestion;
