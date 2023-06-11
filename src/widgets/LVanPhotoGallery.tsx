import React, { useRef } from 'react'
import { Plus } from 'react-feather'
import { LVanShow } from '@widgets/LVanShow'
import { resolveStorageURL } from '@shared/utils'

interface ILVanPhotoGalleryProps {
    photos?: string[]
    accept?: string
    onSelectPhoto?: (files: FileList | null) => void
    onDeletePhoto?: (index: number) => void
}

const LVanPhotoGallery: React.FC<ILVanPhotoGalleryProps> = ({
    accept = 'image/*',
    photos = [],
    onSelectPhoto,
    onDeletePhoto
}) => {
    const inputFile = useRef<HTMLInputElement>(null)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectPhoto?.(e.target.files)
    }

    return (
        <>
            <input
                ref={inputFile}
                type="file"
                accept={accept}
                multiple
                className="hidden"
                onChange={onFileChange}
            />
            <ul className="grid grid-cols-3 gap-3">
                {photos?.map((url, index) => {
                    return (
                        <li
                            key={index}
                            className="w-full overflow-hidden relative rounded-lg relative"
                            style={{
                                aspectRatio: '1'
                            }}>
                            <img
                                className="absolute w-full h-full object-cover object-center"
                                src={resolveStorageURL(url)}
                                alt={`图片${index + 1}`}
                            />
                        </li>
                    )
                })}
                <LVanShow isShow={photos.length < 9}>
                    <li
                        className="w-full overflow-hidden relative rounded-lg border-dashed border-4 border-gray-300 flex items-center justify-center"
                        style={{
                            aspectRatio: '1'
                        }}
                        onClick={() => inputFile.current?.click()}>
                        <div className="flex flex-col items-center">
                            <Plus className="text-gray-300" />
                            <p className="text-sm text-gray-300 font-semibold mt-2">
                                选择图片
                            </p>
                        </div>
                    </li>
                </LVanShow>
            </ul>
        </>
    )
}

export { LVanPhotoGallery }
