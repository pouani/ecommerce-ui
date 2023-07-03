<template lang="">
    <div>
        <div class="default px-3">
            <div class="d-flex justify-content-between my-3">
                <h4>Les Commandes</h4>
                <div class="row gap-1 align-items-center">
                    <div class="col-md-6">
                        <input @change="useFilter(useProduit.products, search)" v-model="search" type="text" placeholder="recherchez un produit" class="form-control">
                    </div>
                    <router-link 
                        :to="{ name: 'all-product' }" 
                        class="btn btn-primary col text-white rounded-32"
                        @click="useCart.showCart = false"
                    >
                        Nouvelle Commande
                    </router-link>
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
                v-if="useOrder.ordersClient.length"
                v-for="(item, index) in paginateOrder" :key="index"
                class="row default align-items-center default py-2 rounded bg-white list-none p-0 mx-0 mb-1">
                
                <li class="col-md">{{ item.nomcommande }}</li>
                <li class="col-md">{{ item.codeCommande }}</li>
                <li class="col-md">{{ item.client?.nomclient }}</li>
                <li class="col-md-2">
                    <b-nav-item-dropdown text="produit" right class="col list-none btn">
                        <b-dropdown-item v-for="(item, index) in item.produits" :key="index">
                            {{ item?.nomproduit }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </li>
                <li class="col-md-2">
                    <span 
                        class="rounded-32 py-1 px-2"
                        :class="item.statutcommande == 'EN_PREPARATION' ? 'bg-info' : 'bg-success'"
                    >{{ item.statutcommande == 'EN_PREPARATION' ? 'encours' : 'validée' }}</span>
                </li>
                <li class="col-md text-center">
                    <button class="btn default"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button 
                        @click="deleteCommande(item.id)"
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
            <div v-if="!useOrder.ordersClient.length" class="d-flex justify-content-center pt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue'
import { useOrderStore } from '../../_store'
import { useClientStore } from '../../_store'

import Swal from 'sweetalert2'

const useClient = useClientStore();


const useOrder = useOrderStore()
console.log(useOrder.ordersClient)

const rows =  computed(() => {
    return useOrder.ordersClient?.length
});
let perPage = ref(5);
let currentPage = ref(1);

const paginateOrder = computed(() => {
    let start = (currentPage.value - 1) * perPage.value;
    let end = currentPage.value * perPage.value;
    return useOrder.ordersClient.slice(start, end);
});

const deleteCommande = (id) => {
    Swal.fire({
        title: 'Etes vous sur?',
        text: "Vous ne pouvez plus revenir en arriere!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: "Oui, supprimer!"
    }).then((result) => {
    if (result.isConfirmed) {
        useOrder.deleteCommande(id)
        Swal.fire(
        'Spprimer!',
        'Votre produit a ete supprimer.',
        'success'
        )
    }
    })
}
useOrder.getCommandeByIdClient(useClient.client.id)
onMounted(() => {
    
})
</script>