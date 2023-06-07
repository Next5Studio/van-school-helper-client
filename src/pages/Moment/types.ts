export interface TypesMoment {
    commentId: string
    user: {
        userId: string
        nickname: string
        avatar: string
        education: {
            college: string
            department: string
            major: string
            clz: string
        }
    }
    content: string
    replyToCommentId?: string | null
    belongsToCommentId: string
    createTime: number
}

export interface TypesMomentTree extends TypesMoment {
    children?: Array<TypesMoment>
}
