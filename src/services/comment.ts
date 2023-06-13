import { BaseContentDTO, RestContentService } from '@services/content'

export interface CreateCommentDTO extends BaseContentDTO {
    relatedContentId: string
    userId: string
    content: string
    belongsToCommentId?: string
    replyToCommentId?: string
}

class CommentServiceImpl extends RestContentService<CreateCommentDTO> {
    protected readonly ResourceName = 'comment'

    public constructor() {
        super()
    }

    async findAllByContentId(
        relatedContentId: string,
        page = 1,
        pageSize = 10,
        sort: 'ASC' | 'DESC' = 'DESC'
    ) {
        return this.request.get(`${this.ResourceName}`, {
            params: {
                page,
                pageSize,
                sort,
                relatedContentId
            }
        })
    }
}

export const CommentService = new CommentServiceImpl()
