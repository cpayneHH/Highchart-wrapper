export namespace HighchartWrapper {
    export type APIEndpoint = string

    export interface Item {
        id: number
        name: string
        status: string
    }

    export interface Props {
        title: string
        endpoint: APIEndpoint
        items: Item[]
    }
}
