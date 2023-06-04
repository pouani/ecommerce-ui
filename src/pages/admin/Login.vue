<template lang="">
    <div class="h-screen">
        <div class="d-flex justify-content-center align-items-center h-100">
            <form action="" class="card p-4" style="max-width: 25rem; width: 100%;">
                <div class="mb-3">
                    <div class="border d-flex align-items-center rounded overflow-hidden">
                        <input v-model="state.email" type="email" placeholder="votre email" class="py-2 w-100 outline-none px-2 border-0">
                        <i class="fa-solid fa-envelope mx-2"></i>
                    </div>
                    <em v-if="v$.email.$error" class="text-end text-danger list-none mb-5">
                        Veillez fournir l'email
                    </em>
                </div>
                <div class="mb-2">
                    <div class="border d-flex align-items-center rounded overflow-hidden">
                        <input v-model="state.password" :type="typePass" placeholder="votre mot de passe" class="py-2 w-100 outline-none px-2 border-0">
                        <i @click="changeType" :class="statePass ? 'fa-eye-slash' : 'fa-sharp fa-eye'" class="fa-solid fi cursor-pointer mx-2"></i>
                    </div>
                    <em v-if="v$.password.minLength.$invalid" class="text-end text-danger list-none">
                        doit contenir au moins {{ v$.password.minLength.$params.min }} caractères. <br>
                    </em>
                    <em v-if="v$.password.$error" class="text-end text-danger list-none">
                        Veillez fournir le mot de passe
                    </em>
                </div>
                <div>
                    <button
                        type="button" 
                        @click="submit"
                        class="btn btn-primary w-100">
                        <span v-if="!auth.loading">Je me connecte</span>
                        <b-spinner v-if="auth.loading" variant="info" label="Spinning"></b-spinner>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue"
import {useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useAuthStore } from '../../_store'


const auth = useAuthStore();

const router = useRouter();

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
        auth.login(state)
    }else{
        console.log(v$.value)
    }
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