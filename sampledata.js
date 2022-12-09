import { client } from '#src/plugins/database'
import env from '#src/plugins/env'
import axios from 'axios'
import lodash from 'lodash'

const sampleOptions = {
    implementos: [
        'Rastra',
        'Arado',
        'Encaladora',
        'Cortamaleza',
        'Vagón Forrajero',
        'Cincel',
        'Retovador',
        'Sembradora',
        'Pulidora',
        'CosechadoraForraje',
        'Remolque'
    ],
    tipos_explotacion: [
        'Ganaderia',
        'Agricola',
        'Mixto'
    ],
    agricola: [
        'Arroz',
        'Frutales',
        'Flores',
        'Banano',
        'Maíz',
        'Palma',
        'Aguacate',
        'Papa',
        'Hortalizas',
        'Caña'
    ]
}

const getDepartments = async () => {

    try {

        const config = {
            headers: {
                'X-Authorization': 'huDQa55syGOgZ0igoIQYWL5MlOoWWwvOdimrDHihqHNJS1rbYG6VRq8eYqHmQvTR',
                'internal': 'Token $2y$10$pQRVR5fJHB8Xo5YLy4ChBu9lLglobnBEMGlQTCywET8cVRO3yUJZu',
                'Authorization': 'Bearer divipol',
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.get('https://bcs-orc.bellpi.co/api/divipol/municipios', config)

        const data = response.data.data[0]['response']['data']

        const map = lodash.groupBy(data, function(b) { return b.departamento.nombre })

        const saveData = Object.entries(map).map( ([key, item ]) => {

            const departamento = item[0].departamento

            departamento.ciudades = item.map(element => {
                delete element.departamento
                return element
            })

            return departamento
        })

        return saveData

    } catch (error) {

        return null
    }

}




const sampleData = async function(){

    try {
        await client.connect()

        const db = client.db(env.DATABASE_NAME)

        const options = db.collection('options')

        if( await options.countDocuments() == 0 ){

            sampleOptions.departamentos = await getDepartments()

            await options.insertOne(sampleOptions)

        }

        console.log('Se cargaron con exito los datos')
        process.exit(0)

        //console.log(db.GetCollection('options'))
    } catch (error) {

        console.log('Error al cargar Datos')
        process.exit(0)
    }

}

sampleData()