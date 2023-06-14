import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'react-feather'
import { toast } from 'react-toastify'

import { LVanBack } from '@widgets/LVanBack'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanLoadingButton } from '@widgets/LVanLoadingButton'

import { useAutosizeTextArea } from '@shared/useAutosizeTextArea'
import { LVanPhotoGallery } from '@widgets/LVanPhotoGallery'
import { FileService } from '@services/file'
import { useMomentStore } from '@shared/stores/moment'
import { useUserStore } from '@shared/stores/user'

const PublishLandFragment: React.FC = () => {
    const navigate = useNavigate()
    const [createMoment] = useMomentStore(({ create }) => [create])
    const [user] = useUserStore(({ user }) => [user])
    const [content, setContent] = useState<any>()
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useAutosizeTextArea(textAreaRef.current, content)

    const onPhotoGallerySelected = async (files: FileList | null) => {
        const { success, data } = await FileService.uploadImage(files)
        if (success) {
            setUploadedFiles([...uploadedFiles, ...data])
        }
    }

    // 发布动态按钮响应事件
    const onBtnPublishClick = async () => {
        if (!content) {
            toast.error('动态内容不可以不填喔~')
            return
        }
        const created = await createMoment({
            userId: user?.userId ?? '43D3A551-A626-6B91-9839-A618413BC4E8',
            content,
            gallery: uploadedFiles
        })
        if (created) {
            toast.success('发布动态成功！')
            setTimeout(
                () =>
                    navigate('/', {
                        replace: true
                    }),
                3000
            )
        }
    }

    return (
        <>
            <LVanHeader>
                <LVanBack Icon={X} />
                <div className="flex-1 flex flex-row-reverse">
                    <LVanLoadingButton
                        iconSize={14}
                        className="text-xs font-semibold !rounded-full !py-2 px-4 items-center !w-auto"
                        onClick={onBtnPublishClick}>
                        发布动态
                    </LVanLoadingButton>
                </div>
            </LVanHeader>
            <div className="mx-5">
                <textarea
                    ref={textAreaRef}
                    className="outline-none resize-none w-full"
                    placeholder="记录今天的新鲜事~"
                    value={content}
                    rows={12}
                    onChange={(e) => setContent(e.target.value)}
                />
                <LVanPhotoGallery
                    photos={uploadedFiles}
                    onSelectPhoto={onPhotoGallerySelected}
                />
            </div>
        </>
    )
}

export { PublishLandFragment }
