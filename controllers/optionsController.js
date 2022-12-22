
const index =  async(request, reply) => {
    const option = await request.db.collection("options").findOne({})

    return reply.send(option)
}

const create =  async(request, reply) => {

    const db = request.db

    const model = await db.collection('options')

    await model.deleteMany({})

    const response = await model.insertOne(request.body)

    return reply.send(response)
}

export default {
    create,
    index
}