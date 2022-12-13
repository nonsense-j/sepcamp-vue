import { defineStore } from "pinia";


export const store = defineStore('store', {
    state: () => ({
        serverURL: 'http://localhost:8080/',
        token: '',
        priority: 0,
        username: 'Aurora',
        userID: 1001,
        groupID: 9001, //-1表示没有组队
        terms: ["2021秋", "2022秋", "2023秋"],
        theme: "dark"
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
        },
        setUserID(userID) {
            this.userID = userID
        },
        clearUserID() {
            this.userID = -1
        },
        setGroupID(groupID) {
            this.groupID = groupID
        },
        clearGroupID() {
            this.groupID = -1
        }
    },

    persist: {
        enabled: true
    }
})