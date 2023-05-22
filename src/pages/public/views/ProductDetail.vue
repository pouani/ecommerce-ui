<template lang="">
    <div class="d-flex justify-content-center py-5">
        <div class="product">
            <div class="product_content">
            <div class="product_content-img">
                <img :src="productData.image" alt="" class="product_content-img-desktop">
            </div>
            <div class="product_content-info">
                <span class="type">Perfume</span>
                <h2>{{productData.name}}</h2>
                <p>
                    {{productData.description}}
                </p>
                <div class="flex">
                <h3 class="new_price">{{productData.price}}f</h3>
                <h5 class="last_price">169.99f</h5>
                </div>{{quant}}
                <div class="d-flex flex-column gap-2">
                    <div class="d-flex border rounded-32">
                        <button @click="useCart.decrementQuantity(productData)" class="btn">-</button>
                        <input type="text" v-model="quant" class="form-control text-center border-0">
                        <button @click="useCart.incrementQuantity(productData)" class="btn">+</button>
                    </div>
                    <button class="btn btn-primary rounded-32">
                        <span>Commander maintenant</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useProductsStore } from '../../../_store/products'
import {useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue'
import { useCartStore } from '../../../_store/carts'

const useCart = useCartStore()

const routes = useRoute();

const useProducts = useProductsStore();

useProducts.getProductById(routes.params.id)

const productData = ref({})
productData.value = useProducts.product

let quantity = ref(1);

let quant = computed(() => {
    const index = useCart.cart.findIndex((item) => item.id === productData.value.id);
    return index != -1 ? useCart.cart[index].quantity : 0;
});

</script>