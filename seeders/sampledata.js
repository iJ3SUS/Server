import { client } from '#src/plugins/database'
import env from '#src/plugins/env'
import axios from 'axios'
import lodash from 'lodash'

import knex from 'knex'

const db = knex({
    client: 'mysql',
    connection: {
      host : env.MAQUINARIA_DATABASE_HOST,
      port : env.MAQUINARIA_DATABASE_PORT,
      user : env.MAQUINARIA_DATABASE_USER,
      password : env.MAQUINARIA_DATABASE_PASS,
      database : env.MAQUINARIA_DATABASE_NAME
    }
})

const sampleOptions = {
    documents: [
        {
            id: 'cc',
            text: 'Cédula de ciudadanía'
        },
        {
            id: 'ce',
            text: 'Cédula de extranjería'
        },
        {
            id: 'nit',
            text: 'Nit'
        }
    ],
    projects: [
        {
            nombre: 'Agrícola',
            production: [
                {
                    name: 'Ganadería',
                    options: [
                        'Aguacate',	'Arroz', 'Banano', 'Caña', 'Flores', 'Frutales',
                        'Hortalizas', 'Maíz', 'Palma', 'Papa', 'Otro'
                    ]
                },
                {
                    name: 'Agricultura',
                    options: [
                        'Leche', 'Carne', 'Doble proposito', 'Otro'
                    ]
                }
            ],
            implements: [
                'Arado de cincel rígido', 'Arado de cincel vibratorio',	'Arado de discos',	'Arado de vertedera',	
                'Cargador frontal',	'Cortamaleza',	'Cosechadora de forraje', 'Distribuidor de abono',	'Encaladora',
                'Enfardadora', 'Fumigadora', 'Hilerador', 'Pulidor de discos',	'Pulidor vibratorio', 'Rastra de discos',
                'Remolque',	'Renovador de pradera',	'Rotocultivador', 'Sembradora grano fino',	'Sembradora grano grueso',	
                'Subsolador', 'Otro'
            ]
        },
        {
            nombre: 'Construcción',
            production: [
                {
                    name: 'Construcción',
                    options: [
                        'Infraestructura', 'Construcción Vertical',	'Canteras',
                        'Público Puertos Agro / Agroindustria',	'Rentadores', 'Otros'
                    ]
                }
            ],
            implements: []
        },
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

const getCategories = async () => {

    const query = await db.raw(`
        SELECT (case when l.category_id=1 then 'Agrícola' ELSE 'Construcción' END) CATEGORIA,
        l.name LINEA, b.name MARCA, r.name REFERENCIA, l.id LINEA_ID, b.id MARCA_ID, r.id REFERENCIA_ID
        FROM maquinaria.references r
        INNER JOIN maquinaria.lines l ON l.id = r.line_id
        INNER JOIN maquinaria.brands b ON b.id=r.brand_id
        ORDER BY l.category_id ASC, l.name  ASC,
        b.name ASC
    `)

    const results = lodash.groupBy(query[0], function(b) { 
        return b.CATEGORIA 
    })

    const items = Object.entries(results).map( ([ key,item ]) => {

        const brandsRaw = lodash.groupBy(item, function(b) { 
            return b.MARCA
        })

        const brands =  Object.entries(brandsRaw).map( ([index, element]) => {

            const brand = element[0] ? element[0] : null

            const linesRaw = lodash.groupBy(element, function(b) { 
                return b.LINEA
            })

            const lines =  Object.entries(linesRaw).map( ([indexLines, elementLines]) => {

                const line = elementLines[0] ? elementLines[0] : null

                const referencesRaw = lodash.groupBy(elementLines, function(b) { 
                    return b.REFERENCIA
                })

                const references = Object.entries(referencesRaw).map( ([indexReferences, elementReferences]) => {

                    const reference = elementReferences[0] ? elementReferences[0] : null

                    return {
                        id: reference ? reference.REFERENCIA_ID : null,
                        name: indexReferences
                    }
                })

                return {
                    id: line ? line.LINEA_ID : null,
                    name: indexLines,
                    references: references
                }

            })

            return {
                id: brand ? brand.MARCA_ID : null,
                name: index,
                lines: lines
            }

        })

        return {
            name: key,
            brands: brands
        }
    })

    return items
}

const sampleData = async function(){

    try {
        await client.connect()

        const db = client.db(env.DATABASE_NAME)

        const options = db.collection('options')

        await options.deleteMany({})

        if( await options.countDocuments() == 0 ){

            const brands = await getCategories()

            sampleOptions.projects.forEach( item => {

                const marcas = brands.find( e => {
                    return e.name == item.nombre
                })

                item.brands = marcas ? marcas.brands : []

            })
            
            sampleOptions.departments = await getDepartments()

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