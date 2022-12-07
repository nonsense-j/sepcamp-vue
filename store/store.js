import {defineStore} from "pinia";

export const store = defineStore('store', {
    state: () => ({
        serverURL: 'http://localhost:8080/',
        token: ''
    }),

    actions: {
        setToken(token) {
            this.token = token
        },
        clearToken() {
            this.token = ''
        }
    }
})