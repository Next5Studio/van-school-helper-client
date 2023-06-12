import { defineStore } from '@shared/utils'
import { MomentModel } from '@shared/models'
import { MomentService } from '@services/moment'

interface IMomentStore {
    list: Array<MomentModel>
    currentPage: number
    pageSize: number
    totalCount?: number
}

interface IMomentActions {
    fetchList: () => Promise<void>
}

export const useMomentStore = defineStore<IMomentStore & IMomentActions>({
    init: (set, get) => ({
        list: [],
        currentPage: 0,
        pageSize: 10,
        fetchList: async () => {
            const { currentPage, totalCount, pageSize } = get()
            if (!totalCount || currentPage * pageSize < totalCount) {
                const { data } = await MomentService.all(get().currentPage + 1)
                console.log(data)
                set((state) => ({
                    list: [...state.list, ...data.list],
                    ...data.pagination
                }))
            }
        }
    })
})
