import { defineStore } from "pinia";


export const useContactStore = defineStore({
    id: 'contact',
    state: () => ({
        contact: {
            message: '',
            email: '',
            adresse: ''
        },
        status: false
    }),

    getters: {
        getContact(): any {
            return this.contact
        }
    },

    actions: {
        setContact(contact: any) {
            this.status = true
            setTimeout(() => {
                this.contact = contact
                this.status = false
            }, 1500);
        }
    },

    persist: true
})