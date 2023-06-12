import { BaseContentDTO, RestContentService } from '@services/content'

export interface CreateMomentDTO extends BaseContentDTO {
    userId: string
    content: string
    cover: string
}

class ProposeServiceImpl extends RestContentService<CreateMomentDTO> {
    protected readonly ResourceName = 'propose'

    public constructor() {
        super()
    }
}

export const ProposeService = new ProposeServiceImpl()
