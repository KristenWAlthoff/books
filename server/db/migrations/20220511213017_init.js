/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * up applies the migration
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('readers', table => {
      table.increments('id');
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('email').notNullable()
  })
  .createTable('books', table => {
      table.increments('id');
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.integer('image_num')
  })
  .createTable('readers_books', table => {
    table.increments('id');
    table.bigint('reader_id');
    table.bigint('book_id');
    table.string('status');
    table.string('date_started');
    table.string('date_finished');
  })
  .createTable('ratings', table => {
    table.increments('id');
    table.bigint('reader_id');
    table.bigint('book_id');
    table.integer('score');
    table.string('comment');
  })
  .createTable('friends', table => {
    table.increments('id');
    table.bigint('reader_id');
    table.bigint('friend_id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * down undoes the migration
 */
exports.down = function(knex) {
  
};
