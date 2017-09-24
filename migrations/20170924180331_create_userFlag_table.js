exports.up = function (knex) {
  return knex.schema.createTable('userflag', function (t) {
    t.increments('id').primary();
    t.integer('userID').notNullable();
    t.integer('flagID').notNullable();
    t.timestamps();
  });
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('userflag');
}