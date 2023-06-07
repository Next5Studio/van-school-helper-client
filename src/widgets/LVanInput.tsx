import React from 'react'
import { XCircle } from 'react-feather'

import { classNames } from '@shared/utils'

interface IBaseLVanInputProps {
    placeholder?: string
    className?: string
    hasClear?: boolean
    value?: string
    onChange?: (value: string) => void
    onClear?: () => void
}

const LVanPhoneNumInputInner: React.FC<IBaseLVanInputProps> = ({
    placeholder,
    className,
    hasClear = false,
    value = '',
    onChange,
    onClear
}) => {
    return (
        <div {...classNames('flex items-center px-4 py-4', className)}>
            <span className="mr-2 text-gray-400">+86</span>
            <input
                value={value}
                className="flex-1 outline-none bg-transparent"
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                autoComplete="new-password"
            />
            {hasClear && value && (
                <XCircle
                    size={20}
                    className="text-gray-400 hover:text-gray-500 ml-4"
                    onClick={onClear}
                />
            )}
        </div>
    )
}

interface ILVanInputProps extends IBaseLVanInputProps {
    type?: 'text' | 'password'
}

const LVanInputInner: React.FC<ILVanInputProps> = ({
    hasClear = false,
    value = '',
    type = 'text',
    placeholder,
    className,
    onChange,
    onClear
}) => {
    return (
        <div {...classNames('flex items-center px-4 py-4', className)}>
            <input
                value={value}
                className="flex-1 outline-none bg-transparent"
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                autoComplete="new-password"
            />
            {hasClear && value && (
                <XCircle
                    size={20}
                    className="text-gray-400 hover:text-gray-500 ml-4"
                    onClick={onClear}
                />
            )}
        </div>
    )
}

type LVanInputInnerTypes = typeof LVanInputInner
interface ILVanInput extends LVanInputInnerTypes {
    PhoneNumber: typeof LVanPhoneNumInputInner
}

const LVanInput = LVanInputInner as ILVanInput
LVanInput.PhoneNumber = LVanPhoneNumInputInner

export { LVanInput }
