
const index =  async(request, reply) => {
    const option = await request.db.collection("options").findOne({})

    return reply.send(option)
}

export default {
    index
}