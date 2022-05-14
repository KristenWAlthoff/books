// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();
const myPassword = process.env.MY_PASSWORD;


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'template1',
      user:     'kristenalthoff',
      password:  myPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'template1',
      user:     'kristenalthoff',
      password:  myPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
