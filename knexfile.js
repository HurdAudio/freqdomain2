'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/freqdomain2_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/freqdomain2_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
