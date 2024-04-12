export interface BaseWorker {
    name: string,
    description: string,
    icon: string | 'defaultIcon',
    id: number,
    keyPoint: string | null,
}