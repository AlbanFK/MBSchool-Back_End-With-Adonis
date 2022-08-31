import { DateTime } from 'luxon'
import { BaseModel, column,  belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Lesson from './Lesson'

export default class Contenu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public path: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>
}
