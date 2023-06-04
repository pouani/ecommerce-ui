<template lang="">
    <div class="products">
        <h2 class="mb-4">Tous les Produits</h2>
        <div class="row">
            <CardItems 
                class="col-6 col-md-3 mb-2 px-1" 
                v-for="item in useProducts.products" :key="index" 
                :productImage="item.image"
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
import { ref, onMounted } from 'vue'
import { useTruncate } from "../../_utils/useTruncate"

import { useProductsStore } from '../../_store/products'

const useProducts = useProductsStore();

const rows = ref(100);
const perPage = ref(10);
const currentPage = ref(1);

onMounted(() => {
    useProducts.getAllProducts()
})
</script>