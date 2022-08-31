import { DateTime } from 'luxon'
import { BaseModel, column,  belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cour from './Cour'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public contenu: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cour)
  public cour: BelongsTo<typeof Cour>
}
