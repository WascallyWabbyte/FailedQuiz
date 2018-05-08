
exports.up = knex => {
  return knex.schema
    .createTable("posts", table => {
      table.increments('id');
      table.string("username");
      table.text("cluck");
      table.string("pictureUrl");
      table.timestamp("createAt").default(knex.fn.now());
      table.timestamp("updatedAt").default(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema.dropTable("posts");
};
