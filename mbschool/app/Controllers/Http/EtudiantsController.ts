import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Etudiant from 'App/Models/Etudiant'

export default class EtudiantsController {
   

    public async store({ request }: HttpContextContract) {

        let etudiant: Etudiant

        const coverImage = request.file('cover_image', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif'],
          })!
          
        await coverImage.moveToDisk('./photo')
        
        try {
            etudiant = await Etudiant.create({
                email: request.body().email,
                password: request.body().password,
                nom: request.body().nom,
                prenom: request.body().prenom,
                localisation: request.body().localisation,
                sexe: request.body().sexe,
                telephone: request.body().telephone,
                photo: coverImage.filePath
               })
               return etudiant
            // console.log(etudiant);
            
        } catch (error) {
          console.error(error)
        }
      
       
       
        
    }

    public async show({ request }: HttpContextContract) {
        return await Etudiant.findOrFail(request.param('id'))
    }

}
