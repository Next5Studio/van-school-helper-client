import { AxiosInterceptor } from './types'

/**
 * 权限拦截器 - 拦截并处理登录权限
 */
export const DataInterceptor: AxiosInterceptor = {
    response: [
        (response) => {
            return response.data
        },
        (error) => {
            const code = error.response.status

            // 放行400状态码
            if (Math.floor(code / 100) === 4) {
                return Promise.reject(error.response.data)
            }
        }
    ]
}
