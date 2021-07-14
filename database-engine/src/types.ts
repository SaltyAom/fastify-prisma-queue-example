export type DatabaseRequestType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LIST'

export interface DatabaseRequest {
    type: DatabaseRequestType
    data: {
        id: number
        title: string
        detail: string
    }
}
