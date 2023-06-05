<template lang="">
    <div class="default client">
        <div class="default px-3">
            <div class="d-flex justify-content-between my-3">
                <h3 class="">Liste de vos commandes</h3>
                <div class="">
                    <input @change="useFilter(useProduit.products, search)" v-model="search" type="text" placeholder="recherchez un produit" class="form-control">
                </div>
            </div>
            <ul class="row gray-600 list-none p-0 m-0">
                <li class="col-md-2">#</li>
                <li class="col-md">Designation</li>
                <li class="col-md">Code</li>
                <li class="col-md">date</li>
                <li class="col-md">produit</li>
                <li class="col-md">Status</li>
                <li class="col-md text-center">Action</li>
            </ul>
            <ul 
                v-if="useProduit?.products.length"
                v-for="(item, index) in paginateProduct" :key="index"
                class="row default align-items-center default py-2 rounded bg-white list-none p-0 mx-0 mb-1">
                <li class="col-md-2"><img src="" alt=""></li>
                <li class="col-md">{{ item.nomproduit }}</li>
                <li class="col-md">{{ item.codeProduit }}</li>
                <li class="col-md">{{ item.prixproduit }}cfa</li>
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
            <div v-if="!useProduit?.products.length" class="d-flex justify-content-center pt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>