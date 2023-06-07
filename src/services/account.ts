import { BaseTransferService } from './base'
import md5 from 'blueimp-md5'

class AccountServiceImpl extends BaseTransferService {
    public constructor() {
        super()
    }

    /**
     * 用户注册新账号
     * @param email 新账号邮箱地址
     * @param password 注册新账号的密码
     */
    public async register(email: string, password: string): Promise<any> {
        return this.request.post('account/join', {
            email,
            password: md5(password)
        })
    }

    /**
     * 用户登录
     * @param loginType 登录方式
     * @param args 登录参数
     */
    public async login(
        loginType: 'phoneNum' | 'account',
        ...args: any[]
    ): Promise<any> {
        const loginBody = {
            phoneNum: {
                phoneNum: args[0],
                verifyCode: args[1]
            },
            account: {
                email: args[0],
                password: md5(args[1])
            }
        }
        return this.request.post(
            `account/login?type=${loginType}`,
            loginBody[loginType]
        )
    }

    /**
     * 用户手机号预登录
     * @param phoneNum 预登录的用户手机号
     */
    public async preLogin(phoneNum: string) {
        return this.request.post(`account/pre-login?phoneNum=${phoneNum}`)
    }
}

export const AccountService = new AccountServiceImpl()
