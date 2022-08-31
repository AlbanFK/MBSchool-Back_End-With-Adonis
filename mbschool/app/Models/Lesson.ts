import { DateTime } from 'luxon'
import { BaseModel, column,  belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Chapitre from 'App/Models/Chapitre'
import Contenu from 'App/Models/Chapitre'

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero: number

  @column()
  public titre: string

  @column()
  public duree: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Chapitre)
  public chapitre: BelongsTo<typeof Chapitre>

  @hasMany(() => Contenu)
  public contenus: HasMany<typeof Contenu>
}
