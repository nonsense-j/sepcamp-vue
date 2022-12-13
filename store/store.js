import { defineStore } from "pinia";


export const store = defineStore('store', {
    state: () => ({
        serverURL: 'http://localhost:8080/',
        token: '',
        priority: 0,
        username: 'Aurora',
        userID: 1001,
        groupID: 9001,
        groupStatus: 0, // 1:表示已经组队了
        groupName: "Bug生产队",
        term: "2022秋",
        interests: ["web开发", "前端", "图像处理", "人机交互"],
        introduction: "作为一名经管与计算机应用专业的学生，我认识到互联网将在未来经济中发挥巨大的作用，所以，业余时间我刻苦自学了很多网络知识。而且，我还不满足于此，进一步学习了Html语言，和Frontpage，Dreamweaver，等网页编辑软件，Firework，flash等网页图形处理软件，可以自如的进行网页编辑。",
        qqAccount: 573924561,
    }),

    actions: {
        setToken(token) {
            this.token = token
        },
        clearToken() {
            this.token = ''
        },
        setPriority(priority) {
            this.priority = priority
        },
        clearPriority() {
            this.priority = -1
        },
        setUsername(username) {
            this.username = username
        },
        clearUsername() {
            this.username = 'Guest'
        }
    },

    persist: {
        enabled: true
    }
})