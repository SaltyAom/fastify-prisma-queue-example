import type { FastifyPluginCallback } from 'fastify'

import { Channel } from '@services/usagi'

import type { Create, Read, Update, Delete, List } from './types'

const crud: FastifyPluginCallback = (app, _, done) => {
    app.put<Create>('/post', async (req, res) => {
        const {
            body: { title, detail }
        } = req

        if (!title) return 'title is required'
        if (!detail) return 'detail is required'

        try {
            const response = await app.usagi.sendRpc(Channel.database, {
                message: {
                    type: 'CREATE',
                    data: {
                        title,
                        detail
                    }
                }
            })

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    })

    app.get<Read>('/post/:id', async (req, res) => {
        const {
            params: { id }
        } = req

        if (!id) return 'id is required'

        try {
            const response = await app.usagi.sendRpc(Channel.database, {
                message: {
                    type: 'READ',
                    data: {
                        id: +id
                    }
                }
            })

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    })

    app.patch<Update>('/post', async (req, res) => {
        const {
            body: { id, ...data }
        } = req

        if (!id) return 'id is required'

        try {
            const response = await app.usagi.sendRpc(Channel.database, {
                message: {
                    type: 'UPDATE',
                    data: {
                        id: +id,
                        ...data
                    }
                }
            })

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    })

    app.delete<Delete>('/post', async (req, res) => {
        const {
            body: { id }
        } = req

        if (!id) return 'id is required'

        try {
            const response = await app.usagi.sendRpc(Channel.database, {
                message: {
                    type: 'DELETE',
                    data: {
                        id: +id
                    }
                }
            })

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    })

    app.get<List>('/post/list', async (_req, res) => {
        try {
            const response = await app.usagi.sendRpc(Channel.database, {
                message: {
                    type: 'LIST'
                }
            })

            res.send(response)
        } catch (error) {
            res.send(error)
        }
    })

    done()
}

export default crud
