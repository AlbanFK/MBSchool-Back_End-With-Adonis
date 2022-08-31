import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'etudiants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('matricule')
      table.string('email')
      table.string('password')
      table.string('nom')
      table.string('prenom')
      table.string('localisation')
      table.string('sexe')
      table.integer('telephone')
      table.string('photo')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
