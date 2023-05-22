import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: [
            {
                id: 1,
                name: 'Product 1',
                price: 100,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=24',
            },
            {
                id: 2,
                name: 'Product 2',
                price: 200,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=25',
            },
            {
                id: 3,
                name: 'Product 3',
                price: 300,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=23',
            },
            {
                id: 4,
                name: 'Product 4',
                price: 400,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=22',
            },
            {
                id: 5,
                name: 'Product 5',
                price: 500,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=21',
            },
            {
                id: 6,
                name: 'Product 6',
                price: 600,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=26',
            },
            {
                id: 7,
                name: 'Product 7',
                price: 700,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=27',
            },
            {
                id: 8,
                name: 'Product 8',
                price: 800,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=28',
            },
            {
                id: 9,
                name: 'Product 9',
                price: 900,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=29',
            },
            {
                id: 10,
                name: 'Product 10',
                price: 1000,
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                image: 'https://picsum.photos/600/300/?image=30',
            },
        ],
        product: {} as any
    }),

    getters: {
        getProducts(): any {
            return this.products;
        }
    },

    actions: {
        //get all products
        async getAllProducts() {
            return this.products;
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

