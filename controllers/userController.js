const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implement other controller functions (login, getAllUsers, getUserById, updateUser, deleteUser)

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
        }
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;
    try {
        const result = await db.query(
        'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
        [username, email, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }
