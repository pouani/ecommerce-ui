import { defineStore } from "pinia";
import Commande from "../../_services/Commande";

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        orders: [] as any,
        order: {} as any,
        ordersClient: [] as any,
        showCommande: false
    }),
    getters: {
        getCommande(): any {
            return this.orders
        }
    },

    actions: {
        async getAllCommandes() {
            await Commande.getAllCommandes().then((res: any) => {
                this.orders = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async getCommandeByIdClient(id: number){
            await Commande.getCommandesByIdClient(id).then((res: any) => {
                console.log(res.data)
                this.ordersClient = res.data;
            }).catch((err: any) => {
                console.log(err);
            })
        },

        async getOneCommande(id: number) {
            await Commande.getOneCommande(id).then((res: any) => {
                this.order = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async createCommande(data: {} | any) {
            await Commande.createCommande(data).then((res: any) => {
                this.orders.push(res.data)
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async deleteCommande(commande: any){
            await Commande.deleteCommande(commande).then((res: any) => {
                this.orders = this.orders.filter((item: any) => item.id != commande);
            }).catch((err: any) => {
                console.log(err)
            })
        }
    },
    persist: {
        paths: ["ordersClient"]
    },
});


// {
//     "client": {
//       "id": 30
//     },
//     "codeCommande": "string",
//     "commandeLivre": true,
//     "datecommande": "string",
//     "nomcommande": "string",
//     "produits": [
//       {"id": 21},
//       {"id": 22}
//     ],
//     "produitcommande": "string",
//     "statutcommande": "EN_PREPARATION"
//   }