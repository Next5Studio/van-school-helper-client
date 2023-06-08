import { defineStore } from '@shared/utils'

interface IUserStore {
    user: {
        isLogin: boolean
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
        const delay = () => {
            return new Promise<any>((resolve) => {
                setTimeout(() => {
                    resolve({
                        user: {
                            isLogin: true
                        }
                    })
                }, 3000)
            })
        }

        useFun.setState({
            ...(await delay())
        })
    }
})
