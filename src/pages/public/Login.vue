<template lang="">
    <div class="default">
        <button v-if="useClient?.token == null" @click="modalShow = !modalShow" class="btn bg-gray-200 rounded-32"><i class="fa-solid fa-user mx-1"></i>Connexion</button>
        <b-nav-item-dropdown v-if="useClient?.token != null" :text="useClient?.client?.name" 
            right class="bg-gray-200 rounded-32 btn p-0">
            <b-dropdown-item>
                Compte
            </b-dropdown-item>
            <b-dropdown-item class="text-danger">
                <router-link :to="{name: 'suivi-commande'}"></router-link>
            </b-dropdown-item>
            <b-dropdown-item class="text-danger" @click="logout()">
                Se deconnecter
            </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-modal v-model="modalShow" hide-footer title="Se connecter" hide-header-close centered>
            <form action="" class="default">
                <div class="mb-3">
                    <div class="border d-flex align-items-center rounded overflow-hidden">
                        <input v-model="state.email" type="email" placeholder="votre email" class="py-2 w-100 px-2 border-0">
                        <i class="fa-solid fa-envelope mx-2"></i>
                    </div>
                    <em v-if="v$.email.$error" class="text-end text-danger list-none mb-5">
                        Veillez fournir l'email
                    </em>
                </div>
                <div class="mb-2">
                    <div class="border d-flex align-items-center rounded overflow-hidden">
                        <input v-model="state.password" :type="typePass" placeholder="votre mot de passe" class="py-2 w-100 px-2 border-0">
                        <i @click="changeType" :class="statePass ? 'fa-eye-slash' : 'fa-sharp fa-eye'" class="fa-solid fi cursor-pointer mx-2"></i>
                    </div>
                    <em v-if="v$.password.minLength.$invalid" class="text-end text-danger list-none">
                        doit contenir au moins {{ v$.password.minLength.$params.min }} caractères. <br>
                    </em>
                    <em v-if="v$.password.$error" class="text-end text-danger list-none">
                        Veillez fournir le mot de passe
                    </em>
                </div>
                <div class="mb-3">
                    <a href="#" class="">J'ai pas de compte ?</a>
                </div>
                <div>
                    <button
                        type="button" 
                        @click="submit()"
                        class="btn btn-primary w-100">Je me connecte</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue"
import {useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useClientStore } from '../../_store'


import { useAuthStore } from '../../_store'

const auth = useAuthStore();

const useClient = useClientStore();


const router = useRouter();

const modalShow = ref(false)

const state = reactive({
    email: '',
    password: '',
});

const rules = computed(() => {
    return {
        email: {required, email},
        password: {required, minLength: minLength(8)}
    }
})

const v$ = useVuelidate(rules, state)
const typePass = ref("password");
const statePass = ref(true)

const submit = () => {
    v$.value.$validate()
    if(!v$.value.$error){
        useClient.login(state).then(() => {
            modalShow.value = false
        })
    }else{
        console.log(v$.value)
    }
}

const logout = () => {
    localStorage.removeItem('client')
}

const changeType = () => {
    if(typePass.value == "password"){
        typePass.value = "text"
        statePass.value = false
    }else{
        typePass.value = "password"
        statePass.value = true
    }
}
</script>