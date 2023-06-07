import React from 'react'
import { classNames } from '@shared/utils'
import { LVanSize } from './types'

interface ILVanSearchBarProps {
    disabled?: boolean
    placeholder?: string
    onSearch?: (keyword: string) => void
    size?: number | LVanSize
}

const LVanSearchBar: React.FC<ILVanSearchBarProps> = ({
    disabled = false,
    placeholder = '输入关键字搜索...',
    size = LVanSize.Normal,
    onSearch
}) => {
    return (
        <div
            {...classNames(
                'flex items-center flex-1',
                'rounded-full px-4 bg-gray-100'
            )}
            style={{
                height: `${size}rem`
            }}>
            <input
                {...classNames('bg-transparent outline-none text-sm')}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    )
}

export { LVanSearchBar }
