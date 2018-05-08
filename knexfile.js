// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr',
      username: "chris",
      password: "supersecret"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }
  }

};
