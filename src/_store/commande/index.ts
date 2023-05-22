import { defineStore } from "pinia";

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        order: [] as any,
        showCommande: false
    }),
    getters: {
        getCommande(): any {
            return this.order
        }
    },

});