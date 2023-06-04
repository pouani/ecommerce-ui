<template lang="">
    <div>
        <h3>Produits de la categorie</h3>
        <div class="row">
            <CardItems 
                class="col-6 col-md-3 p-1" 
                v-for="item in dataProduct" :key="index" 
                :productImage="item.image"
                :productName="item.nomproduit"
                :productPrice="item.prixproduit"
                :productDesciption="useTruncate(item.description, 20)"
                :product="item"
            />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import {useRouter, useRoute } from 'vue-router';
import { useProductsStore } from '../../../_store/products'
import CardItems from "./CardItems.vue"
import { useTruncate } from "../../../_utils/useTruncate"

const useProducts = useProductsStore();

const routes = useRoute();

useProducts.getAllProductsCategorie(routes.params.id);

const dataProduct = computed(() => useProducts.productsCategories)

onMounted(() => {
    useProducts
})
</script>