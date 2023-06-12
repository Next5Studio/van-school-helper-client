import { BaseContentDTO, RestContentService } from '@services/content'

export interface CreateMomentDTO extends BaseContentDTO {
    userId: string
    content: string
    gallery?: Array<string>
}

class MomentServiceImpl extends RestContentService<CreateMomentDTO> {
    protected readonly ResourceName = 'moment'

    public constructor() {
        super()
    }
}

export const MomentService = new MomentServiceImpl()
