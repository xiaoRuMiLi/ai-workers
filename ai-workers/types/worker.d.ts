export interface BaseWorker {
    name: string,
    information: string,
    icon: string | 'defaultIcon',
    id: number,
    keyPoint: string | null,
}