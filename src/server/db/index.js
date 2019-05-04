const { Pool } = require('pg');
// ZURICH CLASSIC (APR-25) = a0863c2a-974f-4d96-a257-e95dcd1254c1
// WELLS FARGO (MAY-02) = 290d621b-5b2c-4387-90e9-504dc82eb481
// AT&T BYRON (MAY-09) = 4ddaa6eb-7159-4ba0-a25f-d3ddf807bdb2
// PGA CHAMPION (MAY-16) = b850e0a9-c15d-4263-8122-03df781e2b8d

const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  connectionString: 'postgres://nnfcgfupqqzyqy:16e57caabe139f9e4a29751db809547b14f5ec7816b1a1a4de114422d865eeb8@ec2-50-17-246-114.compute-1.amazonaws.com:5432/dakcm83ia2qk75',
  ssl: true
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
