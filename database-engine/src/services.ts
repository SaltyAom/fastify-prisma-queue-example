import Usagi from 'usagi-mq'

enum Exchange {
    rpc = 'fastify_rpc'
}

export enum Channel {
    database = 'database_engine'
}

export const createUsagi = async () => {
    const usagi = new Usagi('amqp://localhost')
    await usagi.connect()

    const channel = usagi.createChannel({
        exchanges: [{ name: Exchange.rpc, durable: false }],
        queues: [{ name: Channel.database, bindTo: [Exchange.rpc] }]
    })

    return channel
}
