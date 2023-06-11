import { decodePayload, defineStore } from '@shared/utils'
import { UserService } from '@services/user'
import { UserModel } from '@shared/models'

interface IUserStore {
    isLogin: boolean
    user?: UserModel
}

/**
 * 用户状态模型
 */
export const useUserStore = defineStore<IUserStore>({
    init: (set) => ({
        isLogin: false
    }),
    onLoad: async (useFun) => {
        const token = localStorage.getItem(config.app.authorization.tokenKey)

        // 获取token携带的信息
        const claims = decodePayload(token)
        if (claims) {
            // 用户已登录
            // 获取用户信息
            const { data } = await UserService.getMineDetail()
            console.log('user ===> ', data)
            useFun.setState({
                user: data,
                isLogin: !!data
            })
        }
    }
})
