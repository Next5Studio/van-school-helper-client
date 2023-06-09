import { decodePayload, defineStore } from '@shared/utils'

interface IUserStore {
    user: {
        isLogin: boolean
        [key: string]: any
    }
}

/**
 * 用户状态模型
 */
export const useUserStore = defineStore<IUserStore>({
    init: (set) => ({
        user: {
            isLogin: false
        }
    }),
    onLoad: async (useFun) => {
        const token = localStorage.getItem(config.app.authorization.tokenKey)

        // 获取token携带的信息
        const claims = decodePayload(token)
        if (claims) {
            const { user } = claims
            useFun.setState({
                ...user,
                isLogin: !!user
            })
        }
    }
})
