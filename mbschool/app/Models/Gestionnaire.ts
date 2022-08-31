import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, afterCreate, hasMany, HasMany, manyToMany,  ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Cour from './Cour'
import Payement from './Payement'

export default class Gestionnaire extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public matricule: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public photo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(gestionnaire: Gestionnaire) {
    if (gestionnaire.$dirty.password) {
      gestionnaire.password = await Hash.make(gestionnaire.password)
    }
  }
  @afterCreate()
  public static async assignMatricule(gestionnaire: Gestionnaire) {
    gestionnaire.matricule = `ET${gestionnaire.id}`;
    try {
      await gestionnaire.save()
    } catch (error) {
      console.error(error)
    }
    
  }

  @hasMany(() => Cour)
  public cours: HasMany<typeof Cour>

  @manyToMany(() => Payement)
  public payements: ManyToMany<typeof Payement>
}
