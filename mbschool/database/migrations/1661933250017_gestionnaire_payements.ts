import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gestionnaire_payements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gestionnaire_id').unsigned().references('gestionnaires.id')
      table.integer('payement_id').unsigned().references('payements.id')
      table.unique(['gestionnaire_id', 'payement_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
