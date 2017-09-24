
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('flag').del()
    .then(function () {
      // Inserts seed entries
      return knex('flag').insert([
        {value: 'FLAG3XCE9N',session: 1},
        {value: 'FLAGMU2SOI',session: 1},
        {value: 'FLAG652K2K',session: 1},
        {value: 'FLAGLWPRMV',session: 1},
        {value: 'FLAG2J19DE',session: 1},
        {value: 'FLAGLW4M3W',session: 1},
        {value: 'FLAGLSWPJ8',session: 1},
        {value: 'FLAGQNKS81',session: 1},
        {value: 'FLAGSKWPCY',session: 1},
        {value: 'FLAG723ME1',session: 1}
      ]);
    });
};
