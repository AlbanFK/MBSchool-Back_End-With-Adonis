import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,  BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Etudiant from './Etudiant'

export default class Avi extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public commentaire: string

  @column()
  public note: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Etudiant)
  public etudiant: BelongsTo<typeof Etudiant>
}
