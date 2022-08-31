import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Cour from './Cour'

export default class Categorie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Cour)
  public cours: HasMany<typeof Cour>
}
