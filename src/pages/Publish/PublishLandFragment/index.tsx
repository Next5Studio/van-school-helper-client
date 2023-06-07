import React, { useRef, useState } from 'react'
import { X } from 'react-feather'

import { LVanBack } from '@widgets/LVanBack'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanLoadingButton } from '@widgets/LVanLoadingButton'

import { useAutosizeTextArea } from '@shared/useAutosizeTextArea'
import { LVanPhotoGallery } from '@widgets/LVanPhotoGallery'
import { FileService } from '@services/file'

const PublishLandFragment: React.FC = () => {
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

    return (
        <>
            <LVanHeader>
                <LVanBack Icon={X} />
                <div className="flex-1 flex flex-row-reverse">
                    <LVanLoadingButton
                        iconSize={14}
                        className="text-xs font-semibold !rounded-full !py-2 px-4 items-center !w-auto">
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
