import fastify from 'fastify'

import helmet from 'fastify-helmet'
import compress from 'fastify-compress'
import staticPlugin from 'fastify-static'

import { resolve } from 'path'

import base from '@modules/base'
import crud from '@modules/crud'

import run from '@services/cluster'
import createUsagi from '@services/usagi'

import type { UsagiChannel } from 'usagi-mq'

const app = fastify()

const main = async () => {
    const usagi = await createUsagi()

    app.register(helmet)
        .register(compress)
        .register(staticPlugin, {
            root: resolve('./public')
        })
        .decorate('usagi', usagi)
        .register(base)
        .register(crud)
        .listen(8080, '0.0.0.0', (error, address) => {
            if (error) return console.error(error)

            console.log(`Running at ${address}`)
        })
}

run(main)

declare module 'fastify' {
    interface FastifyInstance {
        usagi: UsagiChannel
    }
}
