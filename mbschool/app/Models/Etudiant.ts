import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, afterCreate, manyToMany,  ManyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Cour from './Cour'
import Avi from './Avi'

export default class Etudiant extends BaseModel {
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
  public static async hashPassword(etudiant: Etudiant) {
    if (etudiant.$dirty.password) {
      etudiant.password = await Hash.make(etudiant.password)
    }
  }
  @afterCreate()
  public static async assignMatricule(etudiant: Etudiant) {
    etudiant.matricule = `ET${etudiant.id}`;
    try {
      await etudiant.save()
    } catch (error) {
      console.error(error)
    }
    
  }

  @manyToMany(() => Cour, {
    pivotColumns: ['payer', 'note', 'commentaire'],
  })
  public cours: ManyToMany<typeof Cour>

  @hasMany(() => Avi)
  public avis: HasMany<typeof Avi>
}
