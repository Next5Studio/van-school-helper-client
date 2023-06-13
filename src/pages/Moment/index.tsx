import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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

import { TypesMoment, TypesMomentTree } from '@pages/Moment/types'
import { useMomentStore } from '@shared/stores/moment'
import { CommentModel } from '@shared/models'
import { useCommentStore } from '@shared/stores/comment'

function Moment() {
    const [searchParams] = useSearchParams()

    const [fetchMomentDetails, dropMoment] = useMomentStore(
        ({ fetchDetails, drop }) => [fetchDetails, drop]
    )
    const [comments, resetCommentList, fetchCommentList] = useCommentStore(
        ({ list, reset, fetchList }) => [list, reset, fetchList]
    )

    const momentId = useMemo(() => searchParams.get('momentId'), [searchParams])
    const [momentDetails, setMomentDetails] = useState({})

    const { gallery, content, user } = momentDetails

    // 构建评论树
    const commentTrees = useMemo(() => {
        const commentsMap: Record<string, /*TypesMoment*/ CommentModel> = {}
        const roots: Array<
            /*TypesMomentTree*/ CommentModel & { children?: any }
        > = []

        if (comments) {
            for (const tempCmt of comments) {
                commentsMap[tempCmt.commentId] = { ...tempCmt }

                // 当前为主评论
                if (
                    !tempCmt.belongsToCommentId ||
                    tempCmt.commentId === tempCmt.belongsToCommentId
                ) {
                    const mappedCmt = commentsMap[tempCmt.commentId]!
                    roots.push(mappedCmt)
                } else {
                    // 主评论回复
                    const parentNode = commentsMap[
                        tempCmt.belongsToCommentId
                    ] as CommentModel & { children?: any }
                    if (!parentNode?.children) {
                        parentNode!.children = [commentsMap[tempCmt.commentId]!]
                    } else {
                        parentNode.children.push(
                            commentsMap[tempCmt.commentId]!
                        )
                    }
                }
            }
        }

        return roots
    }, [comments])

    const menuItems = [
        {
            title: '删除',
            onClick: async () => {
                if (momentId) {
                    await dropMoment(momentId)
                }
            }
        }
    ]

    useEffect(() => {
        resetCommentList()
        if (momentId) {
            fetchMomentDetails(momentId).then(setMomentDetails)
            fetchCommentList(momentId)
        }
    }, [])

    return (
        <LVanPage backTop>
            <div className="relative z-20">
                <LVanHeader className="absolute z-20 !bg-transparent">
                    <LVanBack className="text-white" />
                </LVanHeader>
                <LVanSlideContainer className="h-96 z-10" effect="fade">
                    {gallery?.map((photo, index) => {
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
                        src={user?.avatar}
                        alt={user?.nickname}
                    />
                    <div className="ml-2 flex-1 text-white">
                        <p className="font-bold">{user?.nickname}</p>
                        <p className="text-xs -mt-0.5">
                            {user?.education?.college} · {user?.education?.clz}
                        </p>
                    </div>
                    <ViewMore
                        className="text-white"
                        direction="vertical"
                        menuItems={menuItems}
                    />
                </div>
            </div>
            <div className="relative p-5 z-10">
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
