import React, { PropsWithChildren } from 'react'
import { Loader } from 'react-feather'
import { LVanShow } from '@widgets/LVanShow'
import { classNames } from '@shared/utils'

interface ILVanLoadingButtonProps {
    className?: string
    loading?: boolean
    onClick?: () => void
    iconSize?: number
}

const LVanLoadingButton: React.FC<
    PropsWithChildren<ILVanLoadingButtonProps>
> = ({ children, loading = false, className, onClick, iconSize }) => {
    return (
        <button
            {...classNames(
                'bg-purple-500 active:bg-purple-400 text-white text-md w-full py-4 rounded-lg flex justify-center',
                className,
                {
                    'bg-purple-300': loading
                }
            )}
            onClick={loading ? undefined : onClick}>
            <LVanShow isShow={loading}>
                <Loader size={iconSize} className="mr-2 animate-spin" />
            </LVanShow>
            {children}
        </button>
    )
}

export { LVanLoadingButton }
