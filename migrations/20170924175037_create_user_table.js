exports.up = function (knex) {
  return knex.schema.createTable('user', function (t) {
    t.increments('id').primary();
    t.string('username').notNullable();
    t.integer('score').notNullable().defaultsTo(0);
    t.integer('sessionScore').notNullable().defaultsTo(0);
    t.timestamps(false, true);
  });
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user');
}