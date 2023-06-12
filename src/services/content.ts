import { BaseTransferService } from '@services/base'

export interface BaseContentDTO<T = any> {
    type?: 'CONTENT_MOMENT' | 'CONTENT_PROPOSE'
    metadata?: T
}

export abstract class RestContentService<
    TCreateDto
> extends BaseTransferService {
    protected abstract get ResourceName(): string

    public async all(page = 1, pageSize = 20, sort: 'ASC' | 'DESC' = 'DESC') {
        return this.request.get(`${this.ResourceName}/all`, {
            params: {
                page,
                pageSize,
                sort
            }
        })
    }

    public async create(content: TCreateDto) {
        return this.request.post(this.ResourceName, content)
    }

    public async findOne(id: string) {
        return this.request.get(`${this.ResourceName}/${id}`)
    }

    public async update(id: string, content: TCreateDto) {
        return this.request.put(`${this.ResourceName}/${id}`, content)
    }

    public async delete(id: string) {
        return this.request.delete(`${this.ResourceName}/${id}`)
    }
}
