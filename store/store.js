import {defineStore} from "pinia";


export const store = defineStore('store', {
    state: () => ({
        serverURL: 'http://localhost:8080/',
        token: '',
        priority: -1,
        username: 'Guest'
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