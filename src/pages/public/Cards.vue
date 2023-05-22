<template lang="">
    <div>
        <div class="my-5 d-flex gap-1 justify-content-end">
            <li class="list-none bg-gray-200 w-content px-3 py-2 rounded-32">
                <b-nav-item-dropdown text="Prix" right>
                    <b-dropdown-item href="#">250 - 900</b-dropdown-item>
                    <b-dropdown-item href="#">1000 - 1900</b-dropdown-item>
                    <b-dropdown-item href="#">2000 - 2900</b-dropdown-item>
                    <b-dropdown-item href="#">3000+</b-dropdown-item>
                </b-nav-item-dropdown>
            </li>
            <li class="list-none bg-gray-200 w-content px-3 py-2 rounded-32">
                <b-nav-item-dropdown text="Reviews" right>
                    <b-dropdown-item href="#">4 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">3 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">2 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">pas de notes</b-dropdown-item>
                </b-nav-item-dropdown>
            </li>
        </div>
        <h3>Meilleurs Produits</h3>
        <div class="row">
            <CardItems 
                class="col-6 col-md-3 mb-3" 
                v-for="item in useProducts.products" :key="index" 
                :productImage="item.image"
                :productName="item.name"
                :productPrice="item.price"
                :productDesciption="useTruncate(item.description, 20)"
                :product="item"
            />
        </div>
        <div class="text-center mt-3">
            <router-link :to="{ name: 'all-product' }" 
                class="btn btn-primary">Plus de produits</router-link>
        </div>
    </div>
</template>
<script setup>
import CardItems from "./views/CardItems.vue"
import { useTruncate } from "../../_utils/useTruncate"

import { useProductsStore } from '../../_store/products'

const useProducts = useProductsStore();
</script>