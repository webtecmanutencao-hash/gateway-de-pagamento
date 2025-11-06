// models/License.js
import pool from '../utils/db.js';

const License = {
  async create(licenseId, email, product) {
    const result = await pool.query(
      `INSERT INTO licenses (license_id, email, product, status, created_at)
       VALUES ($1, $2, $3, 'active', NOW()) RETURNING *`,
      [licenseId, email, product]
    );
    return result.rows[0];
  },

  async deactivate(licenseId) {
    const result = await pool.query(
      `UPDATE licenses SET status='inactive' WHERE license_id=$1 RETURNING *`,
      [licenseId]
    );
    return result.rows[0];
  },

  async findById(licenseId) {
    const result = await pool.query(
      `SELECT * FROM licenses WHERE license_id=$1`,
      [licenseId]
    );
    return result.rows[0];
  }
};

export default License;
