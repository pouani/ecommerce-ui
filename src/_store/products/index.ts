import { defineStore } from 'pinia'
import Product from '../../_services/Product';

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: [],
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
            await Product.fetchAllProduits().then((res) => {
                console.log(res)
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
        }
    }
});

