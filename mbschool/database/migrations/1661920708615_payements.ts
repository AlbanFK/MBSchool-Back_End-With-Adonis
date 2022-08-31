import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('cours_id')
        .unsigned()
        .references('cours.id')
        .onDelete('CASCADE')
      table
        .integer('enseignant_id')
        .unsigned()
        .references('enseignants.id')
        .onDelete('CASCADE')
      table.string('transaction')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
