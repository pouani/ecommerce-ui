<template lang="">
    <div class="pt-5">
        <!-- <div class="my-5 d-flex gap-1 justify-content-end">
            <li class="list-none bg-white w-content px-3 py-2 rounded-32">
                <b-nav-item-dropdown text="Prix" right>
                    <b-dropdown-item href="#">250 - 900</b-dropdown-item>
                    <b-dropdown-item href="#">1000 - 1900</b-dropdown-item>
                    <b-dropdown-item href="#">2000 - 2900</b-dropdown-item>
                    <b-dropdown-item href="#">3000+</b-dropdown-item>
                </b-nav-item-dropdown>
            </li>
            <li class="list-none bg-white w-content px-3 py-2 rounded-32">
                <b-nav-item-dropdown text="Reviews" right>
                    <b-dropdown-item href="#">4 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">3 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">2 etoiles</b-dropdown-item>
                    <b-dropdown-item href="#">pas de notes</b-dropdown-item>
                </b-nav-item-dropdown>
            </li>
        </div> -->
        <h3>Meilleurs Produits</h3>
        <div class="row">
            <CardItems 
                class="col-6 col-md-3 p-1" 
                v-for="item in paginateProduct" :key="index" 
                :productImage="item.photo"
                :productName="item.nomproduit"
                :productPrice="item.prixproduit"
                :productDesciption="useTruncate(item.description, 20)"
                :product="item"
            />
        </div>
        <div class="text-center mt-3">
            <router-link :to="{ name: 'all-product' }" 
                class="btn btn-primary text-white"><i class="fa-solid fa-plus"></i> Produits</router-link>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
import CardItems from "./views/CardItems.vue"
import { useTruncate } from "../../_utils/useTruncate"

import { useProductsStore } from '../../_store'

const useProducts = useProductsStore();

const rows =  computed(() => {
    return useProducts.products?.length
});
let perPage = ref(8);
let currentPage = ref(1);

const paginateProduct = computed(() => {
    let start = (currentPage.value - 1) * perPage.value;
    let end = currentPage.value * perPage.value;
    return useProducts.products.slice(start, end);
});

onMounted(() => {
    useProducts.getAllProducts()
})
</script>