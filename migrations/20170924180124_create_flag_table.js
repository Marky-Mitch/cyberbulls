exports.up = function (knex) {
  return knex.schema.createTable('flag', function (t) {
    t.increments('id').primary();
    t.string('value').notNullable();
    t.integer('session').notNullable();
    
    t.timestamps(false, true);
  });
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('flag');
}