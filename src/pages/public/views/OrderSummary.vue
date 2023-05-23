<template lang="">
    <div class="order-summary">
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
                        <div class="col-2 rounded hidden">
                            <img :src="item.image" alt="">
                        </div>
                        <p class="col-3 text-center m-0 mt-2">{{ item.name }}</p>
                        <div class="col-4 text-center">
                            <div class="d-flex border rounded-32">
                                <button class="btn">-</button>
                                <input type="text" v-model="quantity" class="form-control text-center border-0">
                                <button class="btn">+</button>
                            </div>
                        </div>
                        <p class="col-3 text-center mb-0 mt-2">{{ item.price }}</p>
                      
                    </li>
                </ul>
            </div>
            <ul class="list-none p-0">
                <li class="d-flex justify-content-between mb-3">
                    <h5>Total Produit</h5>
                    <h5>{{ useCart.cartQuantity }}</h5>
                </li>
                <li class="d-flex justify-content-between mb-3">
                    <h5>Total Prix</h5>
                    <h5>{{ useCart.cartTotalPrice }} cfa</h5>
                </li>
                <li class="d-flex justify-content-between mb-3">
                    <h5>Livraison</h5>
                    <p>Gratuite</p>
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

</script>