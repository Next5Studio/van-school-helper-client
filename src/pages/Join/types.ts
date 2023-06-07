export interface IHasRequestHandleRef {
    handle: (...args: any[]) => Promise<boolean>
}
