import { defineStore } from "pinia";
import Account from "../../_services/Account";
import router from '../../_routes';
import Client from "../../_services/Client";
import Swal from 'sweetalert2'

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
                    this.client = res.data.userDetails;
                    router.push('/suivicommade')
                }
            }).catch((err: any) => {
                this.loading = false;
                console.log(err)
            })
        },

        async register(state: {}){
            this.loading = true;
            await Account.registerClient(state).then((res: any) => {
                localStorage.setItem('client-token', res.data.accessToken)
                this.loading = false;
                if(res.data.accessToken){
                    this.token = localStorage.getItem('client-token');
                    this.client = res.data.userDetails;
                    router.push('/commande')
                }
            })
        },

        async createClient(state: {} | any){
            let clientRequest = {
                email: state.email,
                nomclient: state.name,
                prenomclient: state.prenom,
                telephoneclient: state.telephone,
                adresseClient: state.adresse,
                motsdepasse: state.password
            }
            this.loading = true;
            await Client.createClient(clientRequest).then((res: any) => {
                this.loading = false;
                this.clients.push(res.data);
                Swal.fire({
                    icon: 'success',
                    text: 'Createtion du client reussie !!!'
                })
            }).catch((err: any) => {
                this.loading = false;
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    text: 'Erreur lors de la createtion du client !!!'
                })
            })
        },

        async getAllClients(){
            await Client.getAllClients().then((response:any) => {
                this.clients = response.data;
            }).catch((error:any) =>{
                console.log(error)
            })
        },

        async deleteClient(id: number){
            await Client.deleteClient(id).then((res:any) => {
                this.clients = this.clients.filter((client:any) => client.id !== id)
            }).catch((error:any) =>{
                console.log(error)
            })
        }

    },
    persist: true
});