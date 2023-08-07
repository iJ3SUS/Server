
import { route, injectable } from '@root/core/decorators'

@injectable()
export default class Prueba{ 

    @route('GET', 'all')
    async index (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        return await collection.find({}).toArray()

    }

    @route('GET', ':id')
    async show (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        const item = await collection.findOne({
            _id: new request.server.util.objectId(request.params.id)
        })

        return item

    }

    @route('PUT', ':id')
    async edit (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        const item = await collection.updateOne({
            _id: new request.server.util.objectId(request.params.id)
        },{
            $set: request.body,
            $currentDate: { lastModified: true }
        })

        return item

    }

    @route('POST', 'save')
    async save (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        await collection.insertOne(request.body)

        return request.body

    }

    @route('DELETE', 'remove/:id')
    async remove (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        await collection.deleteOne({
            _id: new request.server.util.objectId(request.params.id)
        })

        return request.body

    }

}

export const prefix = 'cuentas'