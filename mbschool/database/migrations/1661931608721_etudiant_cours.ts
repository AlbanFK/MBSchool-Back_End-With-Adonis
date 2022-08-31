import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'etudiant_cours'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('etudiant_id').unsigned().references('etudiants.id')
      table.integer('cours_id').unsigned().references('cours.id')
      table.unique(['etudiant_id', 'cours_id'])
      table.boolean('payer')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
