import { defineStore } from 'pinia'
import Product from '../../_services/Product';

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: [] as any,
        product: {} as any,
        productsCategories: [] as any,
    }),

    getters: {
        getProducts(): any {
            return this.products;
        },
        getProduct(): any {
            return this.product;
        }
    },

    actions: {
        //get all products
        async getAllProducts() {
            await Product.fetchAllProduits().then((res: any) => {
                this.products = res.data;
            }).catch((err) => {
                console.log(err)
            });
        },

        //get All products categorie
        async getAllProductsCategorie(id: number) {
            await Product.fetchAllProductsCategorie(id).then((res: any) => {
                this.productsCategories = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        },

        //get one products by id
        async getProductById(id: number) {
            await Product.fetchOneProduit(id).then((res: any) => {
                this.product = res.data
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async createProduct(data: {} | any){
            const requestData = {
                categorie: { id: data.categorie.id },
                nomproduit: data.designation,
                prixproduit: data.prix,
                photo: "",
            }
            console.log(requestData)
            await Product.createProduit(requestData).then((res: {} | any)=> {
                this.products.push(res.data)
            }).catch((error) => {
                console.log(error)
            })
        },

        async createPhoto(data: {} | any){
            const requestPhoto = {
                id: data.id,
                file: data.file
            }
            await Product.createPhotoImage(requestPhoto).then((res: any) => {
                console.log(res)
            }).catch((err: any) => {
                console.log(err)
            })
        },

        async deleteProduit(produit: any){
            await Product.deleteProduit(produit).then((res: any) => {
                this.products = this.products.filter((item: any) => item.id != produit)
            }).catch((err) => {
                console.log(err)
            })
        }
    }
});

