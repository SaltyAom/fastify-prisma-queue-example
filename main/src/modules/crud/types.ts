import type { RequestGenericInterface } from 'fastify'

type DatabaseRequestType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LIST'

export interface DatabaseRequest {
    type: DatabaseRequestType
    data: {
        id?: string
        title?: string
        detail?: string
    }
}

export interface Create extends RequestGenericInterface {
    Body: {
        title: string
        detail: string
    }
}

export interface Read extends RequestGenericInterface {
    Params: {
        id: string
    }
}

export interface Update extends RequestGenericInterface {
    Body: {
        id: string
        title?: string
        detail?: string
    }
}

export interface Delete extends RequestGenericInterface {
    Body: {
        id: string
    }
}

export interface List extends RequestGenericInterface {
    Body: {
        id: string
    }
}
