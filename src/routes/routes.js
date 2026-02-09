const projectRoutes = require("./projectRoutes");
const expenseRoutes = require("./expenseRoutes");

const mountRoutes = (app) => {
  app.use("/api/projects", projectRoutes);
  app.use("/api/expenses", expenseRoutes);
};

module.exports = mountRoutes;
