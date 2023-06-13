import { defineStore } from '@shared/utils'
import { MomentModel } from '@shared/models'
import { CreateMomentDTO, MomentService } from '@services/moment'
import { UserService } from '@services/user'

interface IMomentStore {
    list: Array<MomentModel>
    currentPage: number
    pageSize: number
    totalCount?: number
}

interface IMomentActions {
    fetchList: () => Promise<void>
    fetchDetails: (momentId: string) => Promise<any>
    create: (moment: CreateMomentDTO) => Promise<boolean>
    drop: (momentId: string) => Promise<boolean>
}

export const useMomentStore = defineStore<IMomentStore & IMomentActions>({
    init: (set, get) => ({
        list: [],
        currentPage: 0,
        pageSize: 10,
        fetchList: async () => {
            const { currentPage, totalCount, pageSize } = get()
            if (!totalCount || currentPage * pageSize < totalCount) {
                const { data } = await MomentService.all(
                    currentPage + 1,
                    pageSize
                )
                set((state) => ({
                    list: [...state.list, ...data.list],
                    ...data.pagination
                }))
            }
        },
        fetchDetails: async (momentId) => {
            const { data: moment } = await MomentService.findOne(momentId)
            // const { data: user } = await UserService.getUserDetails(
            //     moment.userId
            // )
            return {
                ...moment
                // user
            }
        },
        create: async (moment) => {
            const { success } = await MomentService.create(moment)
            return success
        },
        drop: async (momentId) => {
            const data = await MomentService.delete(momentId)
            console.log(data)
            return false
        }
    })
})
