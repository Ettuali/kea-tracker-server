const pool = require("../config/db");


//  CREATE PROJECT
const createProject = async (data) => {
  const { name, client_name, estimated_budget } = data;

  const result = await pool.query(
    `INSERT INTO projects (name, client_name, estimated_budget)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, client_name, estimated_budget]
  );

  return result.rows[0];
};
 


//  GET ALL PROJECTS + SUMMARY
const getAllProjects = async () => {
  const result = await pool.query(`
    SELECT 
      p.*,
      COALESCE(SUM(e.amount),0) AS total_expenses,
      (p.estimated_budget - COALESCE(SUM(e.amount),0)) AS remaining_budget
    FROM projects p
    LEFT JOIN expenses e 
    ON p.id = e.project_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};



//  GET SINGLE PROJECT + EXPENSES
const getProjectById = async (id) => {
  const project = await pool.query(
    `SELECT * FROM projects WHERE id=$1`,
    [id]
  );

  const expenses = await pool.query(
    `SELECT * FROM expenses WHERE project_id=$1
     ORDER BY created_at DESC`,
    [id]
  );

  return {
    project: project.rows[0],
    expenses: expenses.rows,
  };
};



// UPDATE PROJECT
const updateProject = async (id, data) => {
  const { name, client_name, estimated_budget } = data;

  const result = await pool.query(
    `UPDATE projects
     SET name=$1,
         client_name=$2,
         estimated_budget=$3
     WHERE id=$4
     RETURNING *`,
    [name, client_name, estimated_budget, id]
  );

  return result.rows[0];
};



// DELETE PROJECT
const deleteProject = async (id) => {
  await pool.query(
    `DELETE FROM projects WHERE id=$1`,
    [id]
  );
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
