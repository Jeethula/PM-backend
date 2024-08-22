const db = require('../config/db');

exports.createProject = async (req, res) => {
  const { p_name, p_desc } = req.body;
  const user_id = req.user.id; // Assuming you set this in the auth middleware
  try {
    const result = await db.query(
      'INSERT INTO projects (user_id, p_name, p_desc) VALUES ($1, $2, $3) RETURNING *',
      [user_id, p_name, p_desc]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other controller functions (getAllProjects, getProjectById, updateProject, deleteProject)

exports.getAllProjects = async (req, res) => {
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM projects WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getProjectById = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, user_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.updateProject = async (req, res) => {
    const id = req.params.id;
    const { p_name, p_desc } = req.body;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query(
        'UPDATE projects SET p_name = $1, p_desc = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
        [p_name, p_desc, id, user_id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.deleteProject = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        await db.query('DELETE FROM projects WHERE id = $1 AND user_id = $2', [id, user_id]);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getAllTasks = async (req, res) => {
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getTaskById = async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, user_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { p_id, desc, status, pic } = req.body;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query(
        'UPDATE tasks SET p_id = $1, desc = $2, status = $3, pic = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
        [p_id, desc, status, pic, id, user_id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.deleteTask = async (req, res) => {
    
    const id = req.params.id;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, user_id]);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getAllTasksByProject = async (req, res) => {
    const p_id = req.params.p_id;
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM tasks WHERE p_id = $1 AND user_id = $2', [p_id, user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getAllProjectsByUser = async (req, res) => {
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM projects WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getAllTasksByUser = async (req, res) => {
    const user_id = req.user.id; // Assuming you set this in the auth middleware
    try {
        const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }


