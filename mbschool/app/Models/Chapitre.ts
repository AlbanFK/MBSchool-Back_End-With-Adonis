import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Lesson from 'App/Models/Lesson'
import Cour from 'App/Models/Cour'

export default class Chapitre extends BaseModel {
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

  @hasMany(() => Lesson)
  public lessons: HasMany<typeof Lesson>

  @belongsTo(() => Cour)
  public cour: BelongsTo<typeof Cour>

}
