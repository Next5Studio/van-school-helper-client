# van-school-helper-client

## 开发环境

-   pnpm
-   node

## 开发注意事项

### 如何使用全局配置

项目内 config 文件夹下定义模块级 config，需要在 config/index.ts 中注册，注册后全局自动拥有配置的定义，通过 config 访问，例如：

新增配置模块 test.config.ts

```typescript
export default {
    foo: {
        bar: 'bar'
    }
}
```

在 config/index.ts 中注册后：

```typescript
import appConfig from './app.config'
import fooConfig from './test.config'

const config = {
    app: appConfig,
    foo: testConfig
}

window.config = config

export default config
```

在全局可以像下面这样访问：

```typescript
// 在普通方法中访问
function xx() {
    return config.foo.bar
}

// 在store中访问
const useXXXStore = defineStore({
    init: (get, set) => ({
        bar: config.foo.bar
    })
})

// 在组件里访问
const Home = () => {
    const bar = config.foo.bar
}
```

### 模块导出规范

1. 页面统一使用 **function** 定义，在文件最底部使用 `export {}` 导出，参考 **_src/pages/Home/index.tsx_**

2. 组件，函数式组件统一使用 **箭头函数** 定义，定义时需要定义组件依赖的 interface，在文件最底部使用 `export {}` 导出，参考 **_src/widgets/LVanAvatar.tsx_**

### 配置服务代理

服务代理的配置在 vite.config.ts 下：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { viteRequire } from 'vite-require'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteRequire()],
    resolve: {
        alias: {
            '@assets': resolve(__dirname, 'src/assets'),
            '@config': resolve(__dirname, 'src/config'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@shared': resolve(__dirname, 'src/shared'),
            '@widgets': resolve(__dirname, 'src/widgets'),
            '@services': resolve(__dirname, 'src/services')
        }
    },
    server: {
        // 在这里配置服务代理
        proxy: {
            // 用户服务代理配置
            '/api/v1/user': 'http://localhost:5200',
            '/api/v1/account': 'http://localhost:5200',
            '/api/v1/storage': 'http://localhost:5200',
            // 内容服务代理配置
            '/api/v1/avatar': 'http://localhost:3002',
            '/api/v1/moment': 'http://localhost:3002',
            '/api/v1/propose': 'http://localhost:3002',
            '/api/v1/comment': 'http://localhost:3002'
        }
    }
})
```

## 目录说明

-   assets
    -   资源文件目录
-   config
    -   配置文件目录
-   pages
    -   页面目录
-   services
    -   接口服务
-   shared
    -   项目内共享的模块和方法
-   widgets
    -   项目级组件
