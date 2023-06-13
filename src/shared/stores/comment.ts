import { defineStore } from '@shared/utils'
import { CommentModel } from '@shared/models'
import { CommentService } from '@services/comment'

interface ICommentStore {
    list: Array<CommentModel>
    currentPage: number
    pageSize: number
    totalCount?: number
}

interface ICommentActions {
    reset: () => void
    fetchList: (contentId: string) => Promise<void>
}

export const useCommentStore = defineStore<ICommentStore & ICommentActions>({
    init: (set, get) => ({
        list: [],
        currentPage: 0,
        pageSize: 10,
        reset: () => {
            set(() => ({
                list: [],
                currentPage: 0,
                pageSize: 10,
                totalCount: undefined
            }))
        },
        fetchList: async (contentId) => {
            const { currentPage, totalCount, pageSize } = get()
            if (!totalCount || currentPage * pageSize < totalCount) {
                const { data } = await CommentService.findAllByContentId(
                    contentId,
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
