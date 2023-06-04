import { defineStore } from "pinia";
import Account from "../../_services/Account";
import router from '../../_routes';
import Client from "../../_services/Client";

export const useClientStore = defineStore({
    id: 'client',
    state: () => ({
        clients: [] as any,
        client: {},
        token: null as any,
        loading: false
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        }
    },

    actions: {
        async login(state: {}) {
            this.loading = true;
            await Account.loginClient(state).then((res: any) => {
                localStorage.setItem('client-token', res.data.accessToken)
                this.loading = false;
                if(res.data.accessToken){
                    this.token = localStorage.getItem('client-token');
                    router.push('/suivicommade')
                }
            }).catch((err: any) => {
                this.loading = false;
                console.log(err)
            })
        },

        async getAllClients(){
            await Client.getAllClients().then((response:any) => {
                this.clients = response.data;
            }).catch((error:any) =>{
                console.log(error)
            })
        }

    }
});