<template lang="">
    <div class="order-summary border-l-dashed px-1">
        <h4>Détails commande</h4>
        <div class="mt-4">
            <ul class="p-0 border-bottom">
                <li class="row">
                    <div class="col-2">
                        <p class="m-0">Image</p>
                        <!-- <img src="https://picsum.photos/600/300/?image=23" alt=""> -->
                    </div>
                    <div class="col-3 text-center">
                        <p class="m-0">Titre</p>
                    </div>
                    <div class="col-4 text-center">
                        <p class="m-0">Quantité</p>
                    </div>
                    <div class="col-3 text-center">
                        <p class="m-0">Prix</p>
                    </div>
                </li>
            </ul>
            <div v-for="(item, index) in cartData" :key="index">
                <ul class="p-0 border-bottom rounded py-2 px-1">
                    <li class="row">
                        <div class="col-2 rounded hidden img-list">
                            <img v-if="item.photo != null" :src="item.photo" alt="" />
                            <img v-if="item.photo == null" src="../../../images/tina-guina-unsplash.jpg" alt="" />
                        </div>
                        <p class="col-3 text-center m-0 mt-2">{{ item.nomproduit }}</p>
                        <div class="col-4 text-center">
                            <div class="d-flex border rounded-32">
                                <button @click="useCart.decrementQuantity(item)" class="btn">-</button>
                                <input type="text" v-model="item.quantity" class="form-control text-center border-0">
                                <button @click="useCart.incrementQuantity(item)" class="btn">+</button>
                            </div>
                        </div>
                        <p class="col-3 text-center mb-0 mt-2">{{ item.prixproduit }}</p>
                      
                    </li>
                </ul>
            </div>
            <ul class="list-none p-0">
                <li class="d-flex justify-content-between mb-3">
                    <h6>Total Produit</h6>
                    <h5>{{ totalQuantity }}</h5>
                </li>
                <li class="d-flex justify-content-between mb-3">
                    <h6>Total Prix</h6>
                    <h5>{{ totalPrice }} cfa</h5>
                </li>
                <li class="d-flex justify-content-between mb-3">
                    <h6 class="gray-600">Livraison</h6>
                    <p class="gray-600">Gratuite</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { useCartStore } from '../../../_store/carts'
import { useProductsStore } from '../../../_store/products'
import {useRouter, useRoute } from 'vue-router';

import { ref, computed } from 'vue'


const useCart = useCartStore()

const routes = useRoute();

const cartData = useCart.cart;

const quantity = ref(0)

const totalPrice = ref(0)
const totalQuantity = ref(0)
totalQuantity.value = computed(() => useCart.getCartQuantity)
totalPrice.value = computed(() => useCart.getCartTotalPrice)



</script>