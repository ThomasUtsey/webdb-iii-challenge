// New changes needed
exports.up = function(knex) {
  return knex.schema.createTable('students', (tbl)=>{
    tbl.increments();//primary key command defaults as ID

    tbl.string('name',128)
       .notNullable()
       .unique();

    tbl.integer('cohortID')
       .references('ID')
       .inTable('cohorts')

  })
};
//undo changes
exports.down = function(knex) {
  return knex.schema.dropTableIfExist('students');
};