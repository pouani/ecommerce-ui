<template lang="">
    <div v-if="useCart.showCart && useCart.cart?.length" class="cart shadow bg-white w-md-25">
        <p class="text-end float-end p-2 h-content w-content mb-0">
            <i 
                @click="useCart.showCart = false"
                class="fa-solid fa-xmark cursor-pointer"></i>
        </p><br>
        <div 
            v-for="(item, index) in useCart.cart" :key="item.index"
            class="px-3 py-2 mt-3 d-flex justify-content-between border-top">
            <div class="cart-img rounded">
                <img v-if="item.photo != null" :src="item.photo" :alt="item.nomproduit">
                <img v-if="item.photo == null" src="../../../images/tina-guina-unsplash.jpg" alt="">
            </div>
            <div>
                <h6>{{ item.quantity + ' - '}}{{ item.nomproduit }}</h6>
                <p>{{ item.prixproduit }}</p>
            </div>
            <i 
                @click="useCart.removeFromCart(item)"
                class="fa-solid fa-xmark mt-3 gray-300 cursor-pointer"></i>
        </div>
        <router-link 
            :to="{ name: 'commande' }" 
            class="btn btn-primary mx-1 my-2 w-100 text-white"
            @click="useCart.showCart = false"
        >
            Commandez maintenant
        </router-link>
    </div>
</template>
<script setup>
import { useCartStore } from '../../../_store/carts'

const useCart = useCartStore()
</script>