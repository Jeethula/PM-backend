const db = require('../config/db');

exports.createTask = async (req, res) => {
  const { p_id, desc, status, pic } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tasks (p_id, desc, status, pic) VALUES ($1, $2, $3, $4) RETURNING *',
      [p_id, desc, status, pic]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other controller functions (getAllTasks, getTaskById, updateTask, deleteTask)
exports.getAllTasks = async (req, res) => {
  try {
    const
        result = await db.query('SELECT * FROM tasks');
    res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { p_id, desc, status, pic } = req.body;
    try {
        const result = await db.query(
        'UPDATE tasks SET p_id = $1, desc = $2, status = $3, pic = $4 WHERE id = $5 RETURNING *',
        [p_id, desc, status, pic, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

