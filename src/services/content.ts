import { BaseTransferService } from '@services/base'

type Response = {
    code: number
    success: boolean
    msg: string
    data?: any
}

export interface BaseContentDTO<T = any> {
    type?: 'CONTENT_MOMENT' | 'CONTENT_PROPOSE'
    metadata?: T
}

export abstract class RestContentService<
    TCreateDto
> extends BaseTransferService {
    protected abstract get ResourceName(): string

    public async all(
        page = 1,
        pageSize = 20,
        sort: 'ASC' | 'DESC' = 'DESC'
    ): Promise<Response> {
        return this.request.get(`${this.ResourceName}/all`, {
            params: {
                page,
                pageSize,
                sort
            }
        })
    }

    public async create(content: TCreateDto): Promise<Response> {
        return this.request.post(this.ResourceName, content)
    }

    public async findOne(id: string): Promise<Response> {
        return this.request.get(`${this.ResourceName}/${id}`)
    }

    public async update(id: string, content: TCreateDto): Promise<Response> {
        return this.request.put(`${this.ResourceName}/${id}`, content)
    }

    public async delete(id: string): Promise<Response> {
        return this.request.delete(`${this.ResourceName}/${id}`)
    }
}
