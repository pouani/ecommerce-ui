import { defineStore } from "pinia";
import { parse, stringify } from 'zipson';
import Categorie from "../../_services/Categorie";

export const useCategorieStore = defineStore({
    id: 'categorie',
    state: () => ({
        categories: [] as any,
        categorie: {},
    }),
    getters: {
        getCategories(): any {
            return this.categories
        },

        getCategorie(): any {
            return this.categorie
        }
    },
    actions: {
        async getAllCategories(){
            await Categorie.fetchAllCategories().then((response: any) =>{
                this.categories = response.data;
            }).catch((error: any) =>{
                console.log(error)
            })
        },

        async getOneCategories(categorie: any){
            await Categorie.fetchOneCategorie(categorie).then((response: any) =>{
                this.categorie = response.data;
            }).catch((error: any) =>{
                console.log(error)
            })
        },

        async createCategorie(data: {} | any){
            const submitState = {
                nomCategorie: data.designation,
                description: data.description,
                codeCategorie: ""
            }
            await Categorie.createCategorie(submitState).then((response: any) => {
                this.categories.push(response.data)
                console.log(this.categories)
            }).catch((error: any) =>{
                console.log(error)
            })
        },

        async deleteCategorie(categorie: {} | any){
            await Categorie.deleteCategorie(categorie).then((response: any) =>{
                this.categories = this.categories.filter((item: any) => item.id != categorie)
            }).catch((error: any) =>{
                console.log(error)
            })
        }
    }
})