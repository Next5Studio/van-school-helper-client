import { defineStore } from '@shared/utils'
import { create } from 'zustand'

/**
 * 用户状态模型
 */
export const useUserStore = defineStore({
    init: (set) => ({
        user: {
            isLogin: false
        }
    })
})

const testStore = create<{ user: number }>((set) => ({
    user: 0,
    inc: () => {
        set({ user: 0 })
    }
}))
