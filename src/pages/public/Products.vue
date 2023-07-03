<template lang="">
    <div class="products">
        <h2 class="mb-4">Tous les Produits</h2>
        <div class="row">
            <CardItems 
                class="col-6 col-md-3 mb-2 px-1" 
                v-for="item in paginateProduct" :key="index" 
                :productImage="item.photo"
                :productName="item.nomproduit"
                :productPrice="item.prixproduit"
                :productDesciption="useTruncate(item.description, 20)"
                :product="item"
            />
        </div>
        <div class="overflow-auto d-flex justify-content-end">
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
            ></b-pagination>
        </div>
    </div>
</template>
<script setup>
import CardItems from "./views/CardItems.vue"
import { ref, onMounted, computed } from 'vue'
import { useTruncate } from "../../_utils/useTruncate"

import { useProductsStore } from '../../_store/products'

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