const pool = require("../config/db");

const addExpense = async (data) => {
  const { project_id, description, amount, category } = data;

  const result = await pool.query(
    `INSERT INTO expenses
     (project_id, description, amount, category)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [project_id, description, amount, category]
  );

  return result.rows[0];
};


const updateExpense = async (id, data) => {
  const { description, amount, category } = data;

  const result = await pool.query(
    `UPDATE expenses
     SET description=$1, amount=$2, category=$3
     WHERE id=$4
     RETURNING *`,
    [description, amount, category, id]
  );

  return result.rows[0];
};


const deleteExpense = async (id) => {
  await pool.query(`DELETE FROM expenses WHERE id=$1`, [id]);
};

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
};
