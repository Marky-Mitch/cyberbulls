exports.up = function (knex) {
    return knex.schema.createTable('comment', function (t) {
      t.increments('id').primary();
      t.string('text').notNullable();
      t.string('name').notNullable().defaultsTo(0);
      t.integer('votes').notNullable().defaultsTo(0);
      t.string('page');
      t.timestamps(false, true);
    });
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comment');
  }