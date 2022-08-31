import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,  BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cour from './Cour'
import Enseignant from './Enseignant'

export default class Payement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public transaction: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cour)
  public cour: BelongsTo<typeof Cour>

  @belongsTo(() => Enseignant)
  public enseignant: BelongsTo<typeof Enseignant>
}
