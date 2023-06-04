import { defineStore } from "pinia";
import { parse, stringify } from 'zipson';

//store cart, add to cart
export const useCartStore = defineStore({
    id: "cart",
    state: () => ({
        cart: [] as any,
        showCart: false,
        cartQuantity: 0,
        cartTotalPrice: 0
    }),
    getters: {
        getCart(): any {
            return this.cart
        },
        getCartQuantity(): Number {
            return this.cartQuantity = this.cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        getCartTotalPrice(): Number {
            return this.cartTotalPrice = this.cart.reduce((acc, item) => acc + item.prixproduit * item.quantity, 0);
        }
    },
    actions: {
        addToCart(product: {}) {
        
            //check if product is already in cart
            const index = this.cart.findIndex((item: any) => item.id == product.id)
            if(index == -1){
                // Si le produit n'est pas encore dans le panier, l'ajouter avec quantity=1
                product.quantity = 1;
                this.cart.push(product);
            }else{
                // Si le produit est déjà dans le panier, augmenter la quantity de 1
                this.cart[index].quantity++
            }

            if(this.cart.length){
                this.showCart = true
            }
        },

        async removeFromCart(product: {}) {
            this.cart.map((item: any, index: number) => {
                if(item.id == product.id){
                    this.cart.splice(index, 1)
                }
            })
        },

        incrementQuantity(product: {}) {
            const index = this.cart.findIndex((item: any) => item.id == product.id);
      
            if (index != -1) {
              this.cart[index].quantity++;
            }
        },
      
        decrementQuantity(product: {}) {
            const index = this.cart.findIndex((item: any) => item.id == product.id);
      
            if (index != -1) {
              const updatedQuantity = this.cart[index].quantity - 1;
      
              if (updatedQuantity > 0) {
                this.cart[index].quantity = updatedQuantity;
              } else {
                // Si la quantité atteint 0, supprimez le produit du panier
                this.cart.splice(index, 1);
              }
            }
        },
    },
    persist: {
        paths: ["cart"],
        serializer: {
            deserialize: parse,
            serialize: stringify,
        }
    },
})