import { BaseTransferService } from './base'

class FileServiceImpl extends BaseTransferService {
    public constructor() {
        super()
    }

    /**
     * 用户上传图片文件
     * @param files 需要上传的图片文件
     */
    public async uploadImage(files: FileList | null): Promise<any> {
        if (files) {
            const formData = new FormData()

            Array.from(files).forEach((file) => {
                if (file) {
                    formData.append('files', file)
                }
            })

            return this.request.post('storage/upload?type=images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    }
}

export const FileService = new FileServiceImpl()
