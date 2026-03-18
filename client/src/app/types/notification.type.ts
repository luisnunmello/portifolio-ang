export type Notification = {
    title: string,
    description: string,
    status?: number,
    closeFunction?: () => void,
    isError?: boolean
}