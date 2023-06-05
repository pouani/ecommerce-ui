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
    }

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