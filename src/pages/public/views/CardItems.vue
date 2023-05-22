<template lang="">
    <div>
        <div class="card border-0 default gap-2" style="max-width: 20rem;">
            <router-link @click="useCart.addToCart(product)" :to="{name: 'product-detail', params: { id: product.id}}">
                <div class="card-img">
                    <img :src="productImage" alt="" class="w-100">
                </div>
                <div class="">
                    <ul class="list-none p-0 m-0 d-flex justify-content-between">
                        <li class="fwb">{{ productName }}</li>
                        <li>{{ productPrice }}</li>
                    </ul>
                    <p class="m-0 my-2">{{ productDesciption }}</p>
                    <ul class="list-none p-0 m-0 d-flex">
                        <li><i class="fa-solid fa-star yellow"></i></li>
                        <li><i class="fa-solid fa-star yellow"></i></li>
                        <li><i class="fa-solid fa-star yellow"></i></li>
                        <li><i class="fa-solid fa-star yellow"></i></li>
                        <li><i class="fa-solid fa-star gray-300"></i></li>
                    </ul>
                </div>
            </router-link>
            <button 
                @click="useCart.addToCart(product)"
                type="button" class="btn my-2 w-content">
                Ajouter <i class="fa-solid fa-cart-shopping mt-1"></i>
            </button>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '../../../_store/carts'

const useCart = useCartStore()

defineProps({
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    productDesciption: {
        type: String,
        require: false
    },
    productImage: {
        type: String,
        require: false
    },
    product: {
        type: Object,
        require: false
    }
})
</script>