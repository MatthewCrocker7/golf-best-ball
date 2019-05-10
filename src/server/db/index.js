const { Pool } = require('pg');
// ZURICH CLASSIC (APR-25) = a0863c2a-974f-4d96-a257-e95dcd1254c1
// WELLS FARGO (MAY-02) = 290d621b-5b2c-4387-90e9-504dc82eb481
// AT&T BYRON (MAY-09) = 4ddaa6eb-7159-4ba0-a25f-d3ddf807bdb2
// PGA CHAMPION (MAY-16) = b850e0a9-c15d-4263-8122-03df781e2b8d

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback)
};
