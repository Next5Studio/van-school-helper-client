import React, { useMemo, useState } from 'react'
import { Send, Heart, MessageSquare } from 'react-feather'

import { ViewMore } from '@pages/Home/widgets/ViewMore'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanSize } from '@widgets/types'
import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanBack } from '@widgets/LVanBack'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { ViewSection } from '@shared/widgets/ViewSection'

import { ViewCommentsInput } from '@pages/Moment/widgets/ViewCommentsInput'
import { ViewCommentsTree } from '@pages/Moment/widgets/ViewCommentsTree'

import { mock } from '@pages/Moment/mock'
import { TypesMoment, TypesMomentTree } from '@pages/Moment/types'

function Moment() {
    const [{ gallery, content, user, comments }] = useState(mock)

    const commentTrees = useMemo(() => {
        const commentsMap: Record<string, TypesMoment> = {}
        const roots: Array<TypesMomentTree> = []

        for (const tempCmt of comments) {
            commentsMap[tempCmt.commentId] = { ...tempCmt }

            // 当前为主评论
            if (tempCmt.commentId === tempCmt.belongsToCommentId) {
                const mappedCmt = commentsMap[
                    tempCmt.commentId
                ]! as TypesMomentTree
                roots.push(mappedCmt)
            } else {
                // 主评论回复
                const parentNode = commentsMap[
                    tempCmt.belongsToCommentId
                ] as TypesMomentTree
                if (!parentNode.children) {
                    parentNode.children = [commentsMap[tempCmt.commentId]!]
                } else {
                    parentNode.children.push(commentsMap[tempCmt.commentId]!)
                }
            }
        }

        return roots
    }, [comments])

    const onViewMore = () => {}

    return (
        <LVanPage backTop>
            <div className="relative z-10">
                <LVanHeader className="absolute z-20 !bg-transparent">
                    <LVanBack className="text-white" />
                </LVanHeader>
                <LVanSlideContainer className="h-96 z-10" effect="fade">
                    {gallery.map((photo, index) => {
                        return (
                            <LVanSlideContainer.Content key={photo}>
                                <img
                                    className="h-full w-full object-cover brightness-75"
                                    src={photo}
                                    alt={`photo_${index + 1}`}
                                />
                            </LVanSlideContainer.Content>
                        )
                    })}
                </LVanSlideContainer>
                <div className="absolute bottom-0 w-full px-4 z-20 flex items-center mb-2">
                    <LVanAvatar
                        className="border-4 border-white"
                        size={LVanSize.Large}
                        src={user.avatar}
                        alt={user.nickname}
                    />
                    <div className="ml-2 flex-1 text-white">
                        <p className="font-bold">{user.nickname}</p>
                        <p className="text-xs -mt-0.5">
                            {user?.education?.college} · {user?.education?.clz}
                        </p>
                    </div>
                    <ViewMore
                        className="text-white"
                        direction="vertical"
                        onViewMore={onViewMore}
                    />
                </div>
            </div>
            <div className="relative p-5 z-20">
                <p className="text-lg mb-2">{content}</p>
                <ul className="flex items-center mt-6 flex-1 space-x-6">
                    <li className="inline-flex items-center">
                        <Heart size={20} />
                        <span className="ml-1 text-sm">1658</span>
                    </li>
                    <li className="inline-flex items-center">
                        <MessageSquare size={20} />
                        <span className="ml-1 text-sm">1658</span>
                    </li>
                    <li className="inline-flex items-center">
                        <Send size={20} />
                        <span className="ml-1 text-sm">1658</span>
                    </li>
                </ul>
            </div>
            <ViewSection
                className="pb-20 px-5 space-y-2 divide-y"
                title="评论回复">
                {commentTrees.map((commentTree) => {
                    return (
                        <ViewCommentsTree
                            key={commentTree.commentId}
                            {...commentTree}
                        />
                    )
                })}
            </ViewSection>
            <ViewCommentsInput></ViewCommentsInput>
        </LVanPage>
    )
}

export { Moment }
