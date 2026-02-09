const projectModel = require("../models/projectModel");


// ➕ CREATE
const createProject = async (req, res) => {
  try {
    const project = await projectModel.createProject(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 📄 GET ALL
const getProjects = async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 📄 GET SINGLE + EXPENSES
const getProjectById = async (req, res) => {
  try {
    const data = await projectModel.getProjectById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// ✏️ UPDATE
const updateProject = async (req, res) => {
  try {
    const project = await projectModel.updateProject(
      req.params.id,
      req.body
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 🗑️ DELETE
const deleteProject = async (req, res) => {
  try {
    await projectModel.deleteProject(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
