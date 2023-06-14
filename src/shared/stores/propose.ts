import { defineStore } from '@shared/utils'
import { ProposeModel } from '@shared/models'
import { ProposeService } from '@services/propose'

interface IProposeStore {
    list: Array<ProposeModel>
    currentPage: number
    pageSize: number
    totalCount?: number
}

interface IProposeActions {
    fetchList: () => Promise<void>
}

export const useProposeStore = defineStore<IProposeStore & IProposeActions>({
    init: (set, get) => ({
        list: [],
        currentPage: 0,
        pageSize: 10,
        fetchList: async () => {
            const { currentPage, totalCount, pageSize } = get()
            if (!totalCount || currentPage * pageSize < totalCount) {
                const { data } = await ProposeService.all(
                    currentPage + 1,
                    pageSize
                )
                console.log(data)
                set((state) => ({
                    list: [...state.list, ...data.list],
                    ...data.pagination
                }))
            }
        }
    })
})
