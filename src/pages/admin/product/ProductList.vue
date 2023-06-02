<template lang="">
    <div class="">
        <div class="default px-3">
            <div class="d-flex justify-content-between my-3">
                <h4>Produits</h4>
                <div class="d-flex gap-1 align-items-center">
                    <button @click="modalShow = true" class="btn bg-primary text-white">+ Produit</button>
                    <b-nav-item-dropdown text="Categorie" right class="list-none btn border border-primary">
                        <b-dropdown-item href="#">
                            <router-link exact :to="{ name: 'list-categories' }">                           
                                <span class="">Plus de categories</span>                             
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                        <b-dropdown-item href="#">Categorie 2</b-dropdown-item>
                        <b-dropdown-item href="#">Categorie 3</b-dropdown-item>
                    </b-nav-item-dropdown>
                </div>
            </div>
            <ul class="row gray-600 list-none p-0 m-0">
                <li class="col-md-2">#</li>
                <li class="col-md">Nom</li>
                <li class="col-md">Code</li>
                <li class="col-md">Prix</li>
                <li class="col-md text-center">Action</li>
            </ul>
            <ul class="row default align-items-center default py-2 rounded bg-white list-none p-0 m-0">
                <li class="col-md-2"><img src="" alt=""></li>
                <li class="col-md">Produit 1</li>
                <li class="col-md">PR1A23</li>
                <li class="col-md">400cfa</li>
                <li class="col-md text-center">
                    <button class="btn default"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button 
                        @click="deleteProduct()"
                        class="btn text-danger bg-trash mx-1"><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
        </div>
        <b-modal v-model="modalShow" hide-footer title="Nouveau Produit" hide-header-close centered>
            <form action="" class="default">
                <div class="form-group mb-2">
                    <VueMultiselect
                        v-model="state.categorie"
                        :options="useCategorie.categories"
                        :close-on-select="true"
                        :clear-on-select="false"
                        placeholder="Selectionnez une categorie"
                        label="nomCategorie"
                        track-by="id"
                    >
                    </VueMultiselect>
                </div>
                <div class="form-group mb-2">
                    <label for="nom">Designation</label>
                    <input v-model="state.designation" type="text" class="form-control">
                    <em v-if="v$.designation.$error" class="text-end text-danger list-none">
                        Veillez fournir la designation
                    </em>
                </div>
                <div class="form-group mb-2">
                    <label for="nom">Description</label>
                    <textarea v-model="state.description" name="" id="" cols="15" rows="5" class="form-control"></textarea>
                    <em v-if="v$.description.$error" class="text-end text-danger list-none">
                        Veillez fournir la description
                    </em>
                </div>
                <div class="form-group mb-2">
                    <label for="prix">Prix</label>
                    <input v-model="state.prix" type="number" class="form-control">
                    <em v-if="v$.prix.$error" class="text-end text-danger list-none">
                        Veillez fournir le prix
                    </em>
                </div>
                <button 
                    type="button" class="btn btn-primary w-100"
                    @click="submit()"
                >J'ajoute le produit</button>
            </form>
        </b-modal>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { useCategorieStore } from "../../../_store"

import Swal from 'sweetalert2'

const useCategorie = useCategorieStore()

const state = reactive({
    categorie: {},
    designation: '',
    description: '',
    prix: 1,
});

const rules = computed(() => {
    return {
        categorie: {required},
        designation: {required},
        description: {required},
        prix: {required}
    }
})

const v$ = useVuelidate(rules, state)

const modalShow = ref(false)

const submit = () => {
    v$.value.$validate()
    if(!v$.value.$error){
        console.log(state)
        modalShow.value = false
    }else{
        console.log(v$.value)
    }
}

const deleteProduct = () => {
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
        Swal.fire(
        'Spprimer!',
        'Votre produit a ete supprimer.',
        'success'
        )
    }
    })
}

onMounted(() =>{
    useCategorie.getAllCategories()
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>