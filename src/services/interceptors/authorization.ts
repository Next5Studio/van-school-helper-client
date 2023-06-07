import { AxiosInterceptor } from './types'

/**
 * 权限拦截器 - 拦截并处理登录权限
 */
export const AuthorizationInterceptor: AxiosInterceptor = {
    request: [
        (axiosConfig) => {
            // 从localstorage中获取token
            const token = localStorage.getItem(
                config.app.authorization.tokenKey
            )

            // 如果获取到token，加入请求头
            if (token) {
                axiosConfig.headers.setAuthorization(token)
            }

            return axiosConfig
        }
    ],
    response: [
        (response) => {
            // 如果服务器返回token
            const token = response.headers['access-token']

            if (token) {
                // 加入localstorage
                localStorage.setItem(config.app.authorization.tokenKey, token)
            }

            return response
        }
    ]
}
