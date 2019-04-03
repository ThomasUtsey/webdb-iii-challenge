// New changes needed
exports.up = function(knex) {
  return knex.schema.createTable('cohorts', (tbl)=>{
    tbl.increments();//primary key command defaults as ID

    tbl.string('name',128)
       .notNullable()
       .unique();

    
  })
};
//undo changes
exports.down = function(knex) {
  return knex.schema.dropTableIfExist('cohorts');
};
