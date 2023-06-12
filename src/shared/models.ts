export type {
    AccountModel,
    EducationModel,
    UserModel,
    MomentModel,
    ProposeModel
}

interface AccountModel {
    email: string
    secret: string
    password: string
}

interface EducationModel {
    college: string
    department: string
    major: string
    clz: string
}

interface UserModel {
    userId: string
    avatar: string
    nickname: string
    phoneNum: string
    totalSoldCnt: number
    totalSoldAmt: number
    account: AccountModel
    education: EducationModel
}

interface MomentModel extends ContentModel {
    type: 'CONTENT_MOMENT'
    momentId: string
    userId: string
    content: string
    gallery: Array<string>
}

interface ProposeModel extends ContentModel {
    type: 'CONTENT_PROPOSE'
    proposeId: string
    userId: string
    cover: string
    content: string
}

interface ContentModel<T = any> {
    type: string
    metadata?: T
    createdAt: Date
    updatedAt: Date
}
