import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo,  BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Chapitre from 'App/Models/Chapitre'
import Notification from 'App/Models/Notification'
import Categorie from 'App/Models/Categorie'
import Payement from 'App/Models/Payement'
import Enseignant from 'App/Models/Enseignant'
import Gestionnaire from 'App/Models/Gestionnaire'

export default class Cour extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titre: string

  @column()
  public prix: number

  @column()
  public duree: number

  @column()
  public valider: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Chapitre)
  public chapitres: HasMany<typeof Chapitre>

  @hasMany(() => Notification)
  public notifications: HasMany<typeof Notification>

  @belongsTo(() => Categorie)
  public categorie: BelongsTo<typeof Categorie>

  @hasMany(() => Payement)
  public payements: HasMany<typeof Payement>

  @belongsTo(() => Enseignant)
  public enseignant: BelongsTo<typeof Enseignant>

  @belongsTo(() => Gestionnaire)
  public gestionnaire: BelongsTo<typeof Gestionnaire>
}
