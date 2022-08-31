import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cours'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('categorie_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
      table
        .integer('enseignant_id')
        .unsigned()
        .references('enseignants.id')
        .onDelete('CASCADE')
      table
        .integer('gestionnaire_id')
        .unsigned()
        .references('gestionnaires.id')
        .onDelete('CASCADE')
      table.string('titre')
      table.integer('prix')
      table.integer('duree')
      table.boolean('valider')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
