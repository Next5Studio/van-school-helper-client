export type { AccountModel, EducationModel, UserModel }

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
