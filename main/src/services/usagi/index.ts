import Usagi from 'usagi-mq'

enum Exchange {
    rpc = 'fastify_rpc'
}

export enum Channel {
    database = 'database_engine'
}

const createUsagi = async () => {
    const usagi = new Usagi('amqp://localhost')
    await usagi.connect()

    const channel = await usagi.createChannel({
        exchanges: [{ name: Exchange.rpc, durable: false }],
        queues: [{ name: Channel.database, bindTo: [Exchange.rpc] }]
    })

    return channel
}

export default createUsagi
