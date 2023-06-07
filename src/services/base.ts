import axios, { AxiosInstance } from 'axios'
import { AuthorizationInterceptor } from './interceptors/authorization'
import { DataInterceptor } from './interceptors/data'

export abstract class BaseTransferService {
    protected request: AxiosInstance

    private interceptors = [AuthorizationInterceptor, DataInterceptor]

    protected constructor() {
        this.request = axios.create({
            ...config.app.transfer
        })
        this.injectInterceptors(this.request)
    }

    private injectInterceptors(instance: AxiosInstance) {
        this.interceptors.forEach((interceptor) => {
            if (interceptor.request) {
                instance.interceptors.request.use(...interceptor.request)
            }
            if (interceptor.response) {
                instance.interceptors.response.use(...interceptor.response)
            }
        })
    }
}
