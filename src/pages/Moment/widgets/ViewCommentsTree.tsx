import React, { PropsWithChildren } from 'react'
import { TypesMoment, TypesMomentTree } from '@pages/Moment/types'
import { classNames } from '@shared/utils'

/**
 * 组件 - 评论及子评论
 */
const ViewComment: React.FC<
    PropsWithChildren<TypesMoment & { className?: string }>
> = ({ children, content, user, className }) => {
    return (
        <div {...classNames('flex pt-4')}>
            <img
                {...classNames('rounded-full mr-4', {
                    'h-10 w-10': !!children,
                    'h-8 w-8': !children
                })}
                src={user.avatar}
                alt={user.nickname}
            />
            <div className="flex-1">
                <p className="text-gray-500 font-semibold">{user.nickname}</p>
                <p>{content}</p>
                <ul className={className}>{children}</ul>
            </div>
        </div>
    )
}

/**
 * 组件 - 评论列表树
 */
const ViewCommentsTree: React.FC<TypesMomentTree> = ({
    children,
    ...restProps
}) => {
    return (
        <ViewComment className="space-y-4 py-2" {...restProps}>
            {children?.map((comment) => (
                <ViewComment key={comment.commentId} {...comment} />
            ))}
        </ViewComment>
    )
}

export { ViewCommentsTree }
