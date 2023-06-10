<template lang="">
    <div>
        <button @click="router.go(-1)" class="btn text-primary"><i class="fa-solid fa-arrow-left"></i>revenir</button>
        <div class="contact d-flex flex-column align-items-center ">
        <h3>Nouvelle commande</h3>
        <form action="" class="shadow bg-white py-3 px-4 rounded" >
            <div class="d-md-flex gap-2 mb-3">
                <div class="form-group">
                    <label for="client form-label">Nom commande</label>
                    <input v-model="state.name" type="text" class="form-control" style="width: 320px;"/>
                    <small v-if="v$.name.$error" class="text-end text-danger">
                        nom commande requis
                    </small>
                </div>
                <div class="form-group">
                    <label for="client form-label">Code commande</label>
                    <input v-model="state.code" type="text" class="form-control" style="width: 320px;"/>
                    <small v-if="v$.code.$error" class="text-end text-danger">
                        code commande requis
                    </small>
                </div>
            </div>
            <div class="d-md-flex gap-2 mb-3">
                <div class="form-group">
                    <label for="client form-label">Nom client</label>
                    <VueMultiselect
                            v-model="state.client"
                            :options="useClient.clients"
                            :close-on-select="true"
                            :clear-on-select="false"
                            placeholder="Selectionnez un client"
                            label="nomclient"
                            track-by="id"
                            style="width: 320px;"
                        >
                    </VueMultiselect>
                    <small v-if="v$.client.$error" class="text-end text-danger">
                        selectionner le client
                    </small>
                </div>
                <div class="form-group">
                    <label for="client form-label">Produits</label>
                    <VueMultiselect
                            v-model="state.produits"
                            :options="useProduit.products"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :multiple="true"
                            placeholder="Selectionnez un/plusieurs produits"
                            label="nomproduit"
                            track-by="id"
                            style="width: 320px;"
                        >
                    </VueMultiselect>
                    <small v-if="v$.produits.$error" class="text-end text-danger">
                        selectionner au moins 1 produit
                    </small>
                </div>
            </div>
            <div class="d-md-flex gap-2 mb-3">
                <div class="form-group">
                    <label for="client form-label">Quantité commandée</label>
                    <input v-model="state.quantite" type="number" class="form-control" style="width: 320px;"/>
                    <small v-if="v$.quantite.$error" class="text-end text-danger"></small>
                </div>
                <div class="form-group">
                    <label for="client form-label">Date commande</label>
                    <input v-model="state.date" type="date" class="form-control" style="width: 320px;"/>
                </div>
            </div>
            <div class="d-md-flex gap-2 mb-3">
                <div class="form-group">
                    <label for="client form-label">Status</label>
                    <VueMultiselect
                            v-model="state.status"
                            :options="StatusCommande"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :preselect-first="true"
                            placeholder="Selectionnez un client"
                            label="name"
                            track-by="value"
                            style="width: 320px;"
                        >
                    </VueMultiselect>
                </div>
            </div>
            <button v-if="useOrder.loading" class="d-flex justify-content-center btn btn-primary" style="width: 320px;">
                <b-spinner class="text-white" label="Spinning"></b-spinner>
            </button>
            <button v-if="!useOrder.loading" @click="submit()" type="button" class="btn btn-primary" style="width: 320px;">Enregistrer la commande</button>
        </form>
    </div>
    </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import VueMultiselect from 'vue-multiselect'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useOrderStore } from '../../../_store'
import { useProductsStore, useClientStore } from "../../../_store"
import {useRouter, useRoute } from 'vue-router';

import Swal from 'sweetalert2';

const router = useRouter();

const useProduit = useProductsStore()
const useClient = useClientStore()

const useOrder = useOrderStore()

const options = reactive([
    { id: 1, name: 'john' },
    { id: 2, name: 'doe' },
    { id: 3, name: 'arisse' },
])
const StatusCommande = reactive([
    { name: 'En Préparation', value: 'EN_PREPARATION' },
    { name: 'Validée', value: 'VALIDEE' },
    { name: 'Livrée', value: 'LIVREE' },
])

const client = ref({})

const state = reactive({
    name: '',
    code: '',
    client: {},
    produits: [],
    date: '',
    status: '',
    quantite: 1
})

const rules = computed(() => {
    return {
        name: {required},
        code: {required},
        client: {required},
        produits: {required},
        quantite: {required},
    }
})

const v$ = useVuelidate(rules, state)

const submit = () => {
    v$.value.$validate()
    if(!v$.value.$error){
        useOrder.createCommande(state).then(() => {
            state.name = '',
            state.code = '',
            state.produits = [],
            state.client = {},
            state.quantite = 1
            Swal.fire(
            'Cree!',
            'Commande cree avec succes.',
            'success'
            )
        })
    }else{
        console.log(v$.value)
    }
}

onMounted(() =>{
    useClient.getAllClients()
    useProduit.getAllProducts();
})

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>