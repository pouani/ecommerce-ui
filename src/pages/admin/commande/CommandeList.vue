<template lang="">
    <div>
        <div class="default px-3">
            <div class="d-flex justify-content-between my-3">
                <h4>Les Commandes</h4>
                <div class="row gap-1 align-items-center">
                    <div class="col-md-6">
                        <input @change="useFilter(useProduit.products, search)" v-model="search" type="text" placeholder="recherchez un produit" class="form-control">
                    </div>
                    <button @click="modalShow = true" class="btn bg-primary col text-white">+ Commande</button>
                </div>
            </div>
            <ul class="row gray-600 list-none p-0 m-0">
                <li class="col-md-2">Designation</li>
                <li class="col-md">Code</li>
                <li class="col-md">Client</li>
                <li class="col-md">Produit</li>
                <li class="col-md">Status</li>
                <li class="col-md text-center">Action</li>
            </ul>
            <ul 
                v-if="useOrder.orders.length"
                v-for="(item, index) in paginateOrder" :key="index"
                class="row default align-items-center default py-2 rounded bg-white list-none p-0 mx-0 mb-1">
                
                <li class="col-md">{{ item.nomcommande }}</li>
                <li class="col-md">{{ item.codeCommande }}</li>
                <li class="col-md">{{ item.client?.nomclient }}</li>
                <li class="col-md-2">
                    <b-nav-item-dropdown text="produit" right class="col list-none btn">
                        <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                        <b-dropdown-item href="#">Categorie 2</b-dropdown-item>
                        <b-dropdown-item href="#">Categorie 3</b-dropdown-item>
                    </b-nav-item-dropdown>
                </li>
                <li class="col-md-2">{{ item.statutcommande }}</li>
                <li class="col-md text-center">
                    <button class="btn default"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button 
                        @click="deleteProduct()"
                        class="btn text-danger bg-trash mx-1"><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
            <div class="">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                ></b-pagination>
            </div>
            <div v-if="!useOrder.orders.length" class="d-flex justify-content-center pt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
import { useOrderStore } from '../../../_store'

const useOrder = useOrderStore()
console.log(useOrder.orders)

const rows =  computed(() => {
    return useOrder.orders?.length
});
let perPage = ref(5);
let currentPage = ref(1);

const paginateOrder = computed(() => {
    let start = (currentPage.value - 1) * perPage.value;
    let end = currentPage.value * perPage.value;
    return useOrder.orders.slice(start, end);
});

onMounted(() => (
    useOrder.getAllCommandes()
))
</script>