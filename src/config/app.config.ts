export default {
    authorization: {
        tokenKey: 'token'
    },
    server: {
        staticPath: 'http://119.91.139.153:5200/storage'
    },
    transfer: {
        baseURL: '/api/v1/',
        timeout: 3000
    },
    colors: {
        '--accent-color': '#374151'
    },
    tabs: [
        {
            name: 'land',
            title: '校园广场',
            icon: require('react-feather').Instagram
        },
        {
            name: 'second-change',
            title: '二手交易',
            icon: require('react-feather').Archive
        },
        {
            name: 'love-wall',
            title: '表白墙',
            icon: require('react-feather').Heart
        },
        {
            name: 'temporary-work',
            title: '代取代寄',
            icon: require('react-feather').Package
        }
    ],
    publishButtons: [
        {
            name: 'land',
            color: 'bg-purple-400',
            title: '校园动态',
            icon: require('react-feather').Instagram
        },
        {
            name: 'second-change',
            color: 'bg-yellow-400',
            title: '二手交易',
            icon: require('react-feather').Archive
        },
        {
            name: 'temporary-work',
            color: 'bg-blue-400',
            title: '校园需求',
            icon: require('react-feather').Package
        },
        {
            name: 'love-wall',
            color: 'bg-red-400',
            title: '表白墙',
            icon: require('react-feather').Heart
        }
    ]
}
