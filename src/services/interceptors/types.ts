import {
    AxiosInterceptorOptions,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios'

type UseParameter<V> = [
    onFulfilled?: ((value: V) => V | Promise<V>) | null,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions
]

export interface AxiosInterceptor {
    request?: UseParameter<InternalAxiosRequestConfig>
    response?: UseParameter<AxiosResponse>
}
