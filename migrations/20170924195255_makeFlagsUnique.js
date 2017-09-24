exports.up = function (knex) {
  return knex.schema.alterTable('flag', function (t) {
    t.unique('value');
  });
}
exports.down = function (knex) {
  return knex.schema.alterTable('flag', function (t) {
    t.dropUnique('value');
  });
}