import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, afterCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Cour from './Cour'
import Payement from './Payement'

export default class Enseignant extends BaseModel {
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
  public qualification: string

  @column()
  public cv: string

  @column()
  public numeroDeCompte: number

  @column()
  public localisation: string

  @column()
  public sexe: string

  @column()
  public telephone: number

  @column()
  public photo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(enseignant: Enseignant) {
    if (enseignant.$dirty.password) {
      enseignant.password = await Hash.make(enseignant.password)
    }
  }
  @afterCreate()
  public static async assignMatricule(enseignant: Enseignant) {
    enseignant.matricule = `ES${enseignant.id}`;
    try {
      await enseignant.save()
    } catch (error) {
      console.error(error)
    }
    
  }

  @hasMany(() =>Cour)
  public cours: HasMany<typeof Cour>

  @hasMany(() =>Payement)
  public payements: HasMany<typeof Payement>
}
