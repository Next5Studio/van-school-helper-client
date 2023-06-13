import { BaseTransferService } from './base'

class UserServiceImpl extends BaseTransferService {
    public constructor() {
        super()
    }

    /**
     * 用户绑定手机号
     * @param phoneNum 需要绑定的手机号码
     * @param verifyCode 绑定验证码
     */
    public async bindPhoneNum(phoneNum: string, verifyCode: string) {
        return this.request.post(
            `user/bind?phoneNum=${phoneNum}&verifyCode=${verifyCode}`
        )
    }

    /**
     * 用户预绑定手机
     * @param phoneNum 手机号
     */
    public async preBindPhoneNum(phoneNum: string) {
        return this.request.post(`user/pre-bind?phoneNum=${phoneNum}`)
    }

    /**
     * 获取登录用户的个人信息
     */
    public async getMineDetails() {
        return this.request.get('user/detail')
    }

    /**
     * 获取userId对应用户个人信息
     * @param userId 需要获取个人信息的用户
     * @returns 用户个人信息
     */
    public getUserDetails(userId: string) {
        return this.request.get(`user/${userId}/details`)
    }
}

export const UserService = new UserServiceImpl()
