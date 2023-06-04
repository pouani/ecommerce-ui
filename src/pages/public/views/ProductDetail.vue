<template lang="">
    <div class="d-flex justify-content-center py-5">
        <div class="product h-100">
            <div class="product_content">
            <div class="product_content-img">
                <img :src="useProducts.product?.image" alt="" class="product_content-img-desktop">
            </div>
            <div class="product_content-info">
                <span class="type">{{ useProducts.product?.categorie?.nomCategorie }}</span>
                <h2>{{useProducts.product?.nomproduit}}</h2>
                <p>
                    {{useProducts.product?.description}}
                </p>
                <div class="flex">
                <h3 class="new_price">{{useProducts.product?.prixproduit}}f</h3>
                <h5 class="last_price">169.99f</h5>
                </div>
                <div class="d-flex flex-column gap-2">
                    <div class="d-flex border rounded-32">
                        <button @click="useCart.decrementQuantity(useProducts.product)" class="btn">-</button>
                        <input type="text" v-model="quantity" class="form-control text-center border-0">
                        <button @click="useCart.incrementQuantity(useProducts.product)" class="btn">+</button>
                    </div>
                    <router-link 
                        :to="{ name: 'commande' }" 
                        class="btn btn-primary rounded-32 text-white mx-1 my-2 w-100"
                        @click="useCart.showCart = false"
                    >
                        Commandez maintenant
                    </router-link>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useProductsStore } from '../../../_store/products'
import {useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../../../_store/carts'

const useCart = useCartStore()

const routes = useRoute();

const useProducts = useProductsStore();

useProducts.getProductById(routes.params.id)

let quantity = computed(() => {
    const index = useCart.cart.findIndex((item) => item.id == useProducts.product?.id);
    return index != -1 ? useCart.cart[index].quantity : 0;
});

onMounted(() => {
    useProducts
})

</script>