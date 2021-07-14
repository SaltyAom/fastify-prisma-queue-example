import { PrismaClient } from '@prisma/client'

import { createUsagi, Channel } from './services'

import type { DatabaseRequest, DatabaseRequestType } from './types'

const prisma = new PrismaClient()

const main = async () => {
    const usagi = await createUsagi()

    await usagi.consumeRpc<DatabaseRequest, any>(
        Channel.database,
        async ({ type, data }) => {
            let valid = type in reducers

            if (!valid) return 'Invalid Type'

            try {
                const process = await reducers[type](data)

                return process
            } catch (error) {
                return error
            }
        }
    )

    console.log('Junbi OK!')
}

const reducers: Record<
    DatabaseRequestType,
    (input: DatabaseRequest['data']) => Promise<unknown>
> = {
    CREATE: async (data) =>
        await prisma.post.create({
            data
        }),
    READ: async ({ id }) =>
        (await prisma.post.findUnique({
            where: {
                id
            }
        })) || 'Not Found',
    UPDATE: async ({ id, ...data }) =>
        await prisma.post.update({
            where: {
                id
            },
            data
        }),
    DELETE: async ({ id }) =>
        await prisma.post.delete({
            where: {
                id
            }
        }),
    LIST: async () =>
        await prisma.post.findMany({
            skip: 0,
            take: 25
        })
} as const

main()