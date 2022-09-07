import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enseignant from 'App/Models/Enseignant'
import Hash from '@ioc:Adonis/Core/Hash'

export default class EnseignantsController {

    public async store({ request, response }: HttpContextContract) {

        let enseignant: Enseignant

        // verification des champs
        if( !(request.body().nom) || !(request.body().prenom) || !(request.body().email) || !(request.body().password) || !(request.body().qualification) || !(request.body().numeroDeCompte) || !(request.body().sexe) || !(request.body().telephone)  ) {
            return response.status(400).send("tous les champs sont obligatoires")
        } else {

            const coverImage = request.file('photo', {
                size: '2mb',
                extnames: ['jpg', 'png', 'gif'],
            })!
            
            await coverImage.moveToDisk('./photo')

            const cvFile = request.file('cv', {
                size: '2mb',
                extnames: ['jpg', 'png', 'pdf', 'docx'],
            })!
            
            await cvFile.moveToDisk('./documents')

            
            try {
                enseignant = await Enseignant.create( {
                    email: request.body().email,
                    password: request.body().password,
                    nom: request.body().nom,
                    prenom: request.body().prenom,
                    localisation: request.body().localisation,
                    qualification: request.body().qualification,
                    numeroDeCompte: request.body().numeroDeCompte,
                    sexe: request.body().sexe,
                    telephone: request.body().telephone,
                    photo: coverImage.filePath,
                    cv: cvFile.filePath
                })
                // if (enseignant.$isLocal) {
                    return response.status(201).send(enseignant)
                // } else {
                //     return response.status(417).send("adresse e-mail déjà utilisée")
                // }
                
                
            } catch (error) {
                return response.status(417).send(error)
            }

        }
      
       
       
        
    }

    public async search({ request, response }: HttpContextContract) {
        let colonne = request.param('attribut')
        let value = request.param('value')
       
        let enseignant= await Enseignant.findBy(`${colonne}`, `${value}`)
        if(!enseignant){
            return response.status(404).send("Enseingnant introuvable")
        }else {
            return response.status(200).send(enseignant)
        } 
        
    }

    public async destroy({ request, response }: HttpContextContract) {
       let enseignant= await Enseignant.findOrFail(request.param('id'))
       if(!enseignant){
            return response.status(404).send("Enseingnant introuvable")
        }else {
            await enseignant.delete()
            return response.status(200).send("Enseingnat supprimé avec succes")
        }
    }

    public async myUpdate({ request, response }: HttpContextContract) {
        let enseignant= await Enseignant.findOrFail(request.param('id'))
        if(!enseignant){
             return response.status(404).send("Enseingnant introuvable")
         }else {
             let attribut= request.param('attribut')

             //mise à jour du mot de passe 
             if (attribut == "password") {
                let mdp= await Hash.make(request.body().password) //cryptage du mot de passe 
                await enseignant
                    .merge({password: mdp})    //mise à jour du mot de passe
                    .save()
                return response.status(200).send("mot de passe mis à jour")
             }
             //mise à jour du cv
             if (attribut == "cv") {
                const newCv = request.file('cv', {
                    size: '2mb',
                    extnames: ['jpg', 'png', 'gif'],
                })!
                
                await newCv.moveToDisk('./documents')

                await enseignant
                    .merge({photo: newCv.filePath})
                    .save()
                return response.status(200).send(enseignant)
             }
              //mise à jour de la photo
              if (attribut == "photo") {
                const newImage = request.file('photo', {
                    size: '2mb',
                    extnames: ['jpg', 'png', 'gif'],
                })!
                
                await newImage.moveToDisk('./photo')

                await enseignant
                    .merge({photo: newImage.filePath})
                    .save()
                return response.status(200).send(enseignant)
             }
             //mise à jour du telephone
             if (attribut == "telephone") {
                await enseignant
                    .merge({telephone: request.body().telephone})
                    .save()
                return response.status(200).send(enseignant)
             }
             //mise à jour du numeroDeCompte
             if (attribut == "numeroDeCompte") {
                await enseignant
                    .merge({numeroDeCompte: request.body().numeroDeCompte})
                    .save()
                return response.status(200).send(enseignant)
             }
              //mise à jour de la qualification
              if (attribut == "qualification") {
                await enseignant
                    .merge({qualification: request.body().qualification})
                    .save()
                return response.status(200).send(enseignant)
             }
              //mise à jour de la localisation
              if (attribut == "localisation") {
                await enseignant
                    .merge({localisation: request.body().localisation})
                    .save()
                return response.status(200).send(enseignant)
             }
             //mise à jour du email
             if (attribut == "email") {
                await enseignant
                    .merge({email: request.body().email})
                    .save()
                return response.status(200).send(enseignant)
             }
             //mise à jour du nom
             if (attribut == "nom") {
                await enseignant
                    .merge({nom: request.body().nom})
                    .save()
                return response.status(200).send(enseignant)
             }
             //mise à jour du prenom
             if (attribut == "prenom") {
                await enseignant
                    .merge({prenom: request.body().prenom})
                    .save()
                return response.status(200).send(enseignant)
             }

        }

        // return await Enseignant.findOrFail(request.param('id'))
    }
}
