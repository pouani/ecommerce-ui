import { defineStore } from "pinia";
import { parse, stringify } from 'zipson';
import router from '../../_routes';

import Account from "../../_services/Account";
import Swal from 'sweetalert2'

//store users and auth
export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: {},
        client: {},
        token: null as any,
        loading: false,
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        }
    },

    actions: {
        async login(state: {}) {
            this.loading = true;
            Account.login(state).then((res: any) => {
                localStorage.setItem('acess-token', res.data.accessToken)
                this.loading = false;
                if(res.data.accessToken){
                    this.token = localStorage.getItem('acess-token');
                    router.push('/admin')
                }
            }).catch((err: any) => {
                this.loading = false;
                if(err.response.status == 400){
                    Swal.fire({
                        icon: 'error',
                        text: `${err.response.data.errors[0]}`,
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: `${err.response.data.message}`,
                    })
                }
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
        },

        async loginClient(data: {}){
            this.loading = true;
            await Account.loginClient(data).then((res: any) => {
                this.loading = false;
                if(res.data.accessToken){
                    this.token = localStorage.getItem('client-token');
                }
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async registerClient(data: {}){
            this.loading = true;
            await Account.registerClient(data).then((res: any) => {
                this.loading = false;
                if(res.data.accessToken){
                    this.token = localStorage.getItem('client-token');
                }
            }).catch((err) => [
                console.log(err)
            ])
        }
    },
    persist: true,
});