<template lang="">
    <div>
        All product pages {{ useProducts.products }}
    </div>
</template>
<script setup>
import { useProductsStore } from '../../_store/products'

const useProducts = useProductsStore();
</script>