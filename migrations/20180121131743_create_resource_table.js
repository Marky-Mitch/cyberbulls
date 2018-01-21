exports.up = function (knex) {
    return knex.schema.createTable('resource', function (t) {
      t.increments('id').primary();
      t.string('title').notNullable();
      t.text('text').notNullable();
      t.string('link').notNullable().defaultsTo(0);
      t.integer('votes').notNullable().defaultsTo(0);
      t.string('page');
      t.timestamps(false, true);
    });
  }
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('resource');
  }