import { defineStore } from "pinia";
import { parse, stringify } from 'zipson';
import router from '../../_routes';

import Account from "../../_services/Account";

//store users and auth
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: {},
        token: null as any,
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        }
    },

    actions: {
        async login(state: {}) {
            Account.login(state).then((res: any) => {
                localStorage.setItem('acess-token', res.data.accessToken)
                if(res.data.accessToken){
                    this.token = localStorage.getItem('acess-token');
                    router.push('/admin')
                }
            }).catch((err: any) => {
                console.log(err);
            })
        },

        async setUser(){
            Account.setUser().then((res: any) => {
                this.user = res.data;
            }).catch((err: any) => {
                console.log(err);
            })
        },

        async logout(){
            Account.logout()
            if(localStorage.getItem('acess-token') == null){
                router.push('/login')
            }
        }
    },
    persist: true,
});