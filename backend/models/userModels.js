const db = require('../config/database');

const findByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};


const createUser = async (username, hashedPassword) => {
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    return result;
};

module.exports = { findByUsername, createUser };
