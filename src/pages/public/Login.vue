<template lang="">
    <div class="default">
        <button @click="modalShow = !modalShow" class="btn bg-gray-200 rounded-32"><i class="fa-solid fa-user mx-1"></i>Connexion</button>

        <b-modal v-model="modalShow" hide-footer hide-header hide-header-close centered>
            <form action="" class="default">
                <div class="border d-flex align-items-center mb-3 rounded">
                    <input type="text" placeholder="votre email" class="py-2 w-100 px-1 border-0">
                    <i class="fa-solid fa-envelope mx-2"></i>
                </div>
                <div class="border d-flex align-items-center mb-2 rounded">
                    <input type="password" placeholder="votre mot de passe" class="py-2 w-100 px-1 border-0">
                    <i class="fa-solid fa-eye mx-2 cursor-pointer"></i>
                </div>
                <div class="mb-3">
                    <a href="#" class="">J'ai pas de compte ?</a>
                </div>
                <div>
                    <button class="btn btn-primary w-100">Je me connecte</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script setup>
import { ref } from "vue"


const modalShow = ref(false)
</script>