import { BaseContentDTO, RestContentService } from '@services/content'

export interface CreateProposeDTO extends BaseContentDTO {
    userId: string
    content: string
    cover: string
}

class ProposeServiceImpl extends RestContentService<CreateProposeDTO> {
    protected readonly ResourceName = 'propose'

    public constructor() {
        super()
    }
}

export const ProposeService = new ProposeServiceImpl()
