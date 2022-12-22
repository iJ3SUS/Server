import util from 'lodash'
import { client } from '#src/plugins/database'
import readXlsxFile from 'read-excel-file/node'
import env from '#src/plugins/env'

import { getCities } from '#src/utils/divipol'


const importXLS = async () => {

    try {
        await client.connect()

        await importUsers()

        console.log('Usuarios importados.')
        
        await importClients()

        console.log('Clientes importados.')
        
    } catch (error) {

        console.log(error)

    }

    client.close()

    process.exit(0)

}

const importUsers = async () => {

    const rows = await readXlsxFile('files/db.xlsx', { sheet: 1 })

    const users = rows.map( item => {
        return {
            cc: item[0] ? String(item[0]) : null,
            name: item[1],
            email: item[2],
            location: item[3],
            role: item[4]
        }
    }).slice(1)

    const ids = users.map( item => item.cc )

    const db = client.db(env.DATABASE_NAME)

    const exists = await db.collection('users').find( { cc: { $in: ids } } ).toArray()

    const exitsIds = exists.map( item => item.cc )

    const insert = users.filter( item => {
        return !exitsIds.includes( item.cc )
    })

    if(insert.length <= 0) return 

    await db.collection('users').insertMany(insert)

}

const importClients = async () => {
    const rows = await readXlsxFile('files/db.xlsx', { sheet: 2 })

    const group = util.groupBy(rows, function(b) {
        const typeProyect = b[3].replace('John Deere','').trim()
        return b[6] + '.' + typeProyect
    })

    const cities = await getCities()

    const city = cities[0]
   
    const insert = Object.entries(group).map(( [key, item ] ) => {

        const element = item[0]

        const typeProyect = element[3].replace('John Deere','').trim()

        const types = {
            "Agrícola": "Agrícola",
            "Golf & Turf": "Golf & Turf",
            "Construccion": "Construcción"
        }

        const stringCity = element[7].split("-")

        const cityName = homologateCity( stringCity[1] )

        const findedCity = cities.find(element => {
            return element.nombre.toLowerCase() == cityName.toLowerCase()
        })

        const latitud = findedCity ? findedCity.latitud : 0
        const longitud = findedCity ? findedCity.longitud : 0

        return {
            documentoAsesor: "999999",
            client: {
                typeDocument: "nit",
                document: element[6],
                name: element[0],
                email: element[1],
                address: element[7],
                cellphone: element[2],
                status: "Sincronizado",
                project: {
                    typeProyect: types[typeProyect],
                    numberMachines: "0",
                    latitud: latitud,
                    longitud: longitud,
                    city: findedCity ? findedCity : city,
                    state: findedCity ? findedCity.departamento : city.departamento,
                    numberProyectsHectares: 0,
                    worksItems: [],
                    otherWorksItems: '',
                    subWorksItems: '',
                    machines: []
                },
                

            }
        }

    })

    const db = client.db(env.DATABASE_NAME)
    await db.collection('clients').insertMany(insert)

    // const mapCities = insert.map( item => {
    //     return item.city
    // })


    // console.log(
    //     util.uniq( mapCities )
    // )

}

const homologateCity = (city) => {

    if(!city){
        return ''
    }

    const homologue = {
        'B/Quilla': 'BARRANQUILLA',
        'Valledupar': 'VALLEDUPAR', 
        'Itagui': 'ITAGÜÍ',
        'Chia': 'CHÍA',
        'Ibague': 'IBAGUÉ',
        'Cali': 'CALI',
        'Villavo': 'VILLAVICENCIO',
        'Ib': 'IBAGUÉ',         
        'Neiva': 'NEIVA',
        'Monteria': 'MONTERÍA',   
        'Yopal': 'YOPAL',
        'P.Gaitan': 'PUERTO GAITÁN',   
        'Cota': 'COTA',
        'Bta': 'BOGOTÁ. DC.'
    }

    return homologue[city] ? homologue[city] : city
  
}

importXLS()
