import { defineStore } from 'pinia'
import Product from '../../_services/Product';

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: [] as any,
        product: {} as any
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

        //get one products by id
        async getProductById(id: number) {
        //    this.products.find((product: any) => product.id == id);
           this.product = this.products.find((product: any) => product.id == id);
           console.log(this.product)
           return this.product;
        },

        async createProduct(data: {} | any){
            const requestData = {
                categorie: data.categorie,
                nomproduit: data.designation,
                prixproduit: data.prix,
                codeProduit: "",
            }
            await Product.createProduit(requestData).then((res: {} | any)=> {
                this.products.push(res.data)
            }).catch((error) => {
                console.log(error)
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

