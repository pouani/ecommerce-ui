<template lang="">
    <div>
        <div class=""></div>
        <div class="default px-md-3">
            <div class="d-flex justify-content-between my-3">
                <h4>Liste des clients</h4>
                <router-link :to="{ name: 'create-client' }" 
                    type="button" class="btn bg-primary text-white"
                >+ client</router-link>
            </div>
            <ul class="row gray-600 list-none p-0 m-0">
                <li class="col-1 col-md-1">#</li>
                <li class="col col-md">Nom</li>
                <li class="d-none d-md-block col col-md">Prenom</li>
                <li class="d-none d-md-block col col-md">Email</li>
                <li class="d-none d-md-block col col-md">Adresse</li>
                <li class="col col-md text-center">Action</li>
            </ul>
            <ul 
                v-for="(item, index) in useClients?.clients" :key="index"
                class="row default align-items-center default py-2 rounded bg-white list-none p-0 mx-0 mb-1">
                <li class="col-1 col-md-1 fwb">{{ index + 1}}</li>
                <li class="col col-md">{{ item.nomclient }}</li>
                <li class="d-none d-md-block col col-md">{{item.prenomclient}}</li>
                <li class="d-none d-md-block col col-md">{{item.email}}</li>
                <li class="d-none d-md-block col col-md">{{ item.adresseClient }}</li>
                <li class="col col-md text-center">
                    <button type="button" 
                        @click="getOne(item.id)"
                        class="btn default"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button"
                        @click="deleteClient(item.id)"
                        class="btn text-danger bg-trash mx-1"
                    ><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
            <div v-if="!useClients?.clients.length" class="d-flex justify-content-center pt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import {useClientStore} from "../../../_store"
import Swal from 'sweetalert2'

const useClients = useClientStore()

const deleteClient = (id) => {
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
        useClients.deleteClient(id)
        Swal.fire(
        'Spprimer!',
        'Client supprimer.',
        'success'
        )
    }
    })
}

onMounted(() => (
    useClients.getAllClients()
))
</script>