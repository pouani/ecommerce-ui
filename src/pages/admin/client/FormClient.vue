<template lang="">
    <div>
        <div class="client">
            <button @click="router.go(-1)" class="btn text-primary"><i class="fa-solid fa-arrow-left"></i>revenir</button>
            <div class="create d-flex justify-content-center">
                <form action="" class="bg-white px-4 py-3 rounded">
                    <div class="d-flex gap-2">
                        <div class="mb-3 w-100">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" v-model="state.email" class="form-control" id="email" placeholder="name@example.com">
                            <em v-if="v$.email.$error" class="text-end text-danger list-none mb-5">
                                Veillez fournir votre email
                            </em>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Nom</label>
                            <input type="text" v-model="state.name" class="form-control" id="name" placeholder="name">
                            <em v-if="v$.name.$error" class="text-end text-danger list-none mb-5">
                                Veillez fournir votre nom
                            </em>
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="mb-3">
                            <label for="name" class="form-label">Prenom</label>
                            <input type="text" v-model="state.prenom" class="form-control" id="name" placeholder="prenom">
                        </div>
                        <div class="mb-3">
                            <label for="adresse" class="form-label">Adresse</label>
                            <input v-model="state.adresse" type="text" class="form-control" id="adresse" placeholder="Kotto Bonamoussadi">
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="mb-3">
                            <label for="telephone" class="form-label">Telephone</label>
                            <input v-model="state.telephone" type="text" class="form-control" id="telephone" placeholder="677563423">
                            <em v-if="v$.telephone.$error" class="text-end text-danger list-none mb-5">
                                Veillez fournir un numero* de telephone
                            </em>
                        </div>
                        <div class="mb-3">
                            <label for="psw" class="form-label">Mot de passe</label>
                            <input v-model="state.password" type="password" class="form-control" id="psw" placeholder="password">
                            <em v-if="v$.password.minLength.$invalid" class="text-end text-danger list-none">
                                doit contenir au moins {{ v$.password.minLength.$params.min }} caractères. <br>
                            </em>
                            <em v-if="v$.password.$error" class="text-end text-danger list-none">
                                Veillez fournir le mot de passe
                            </em>
                        </div>
                    </div>
                    <button v-if="useClient.loading" type="button" class="btn btn-primary w-50">
                        <b-spinner class="white" label="Spinning"></b-spinner>
                    </button><br>
                    <button v-if="!useClient.loading" type="button" class="btn btn-primary w-50" @click="submit">Enregistrer</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { useClientStore } from '../../../_store'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, numeric } from '@vuelidate/validators'
import {useRouter, useRoute } from 'vue-router';

const router = useRouter();

const useClient = useClientStore();

const state = reactive({
    email: '',
    name: '',
    prenom: '',
    telephone: '',
    adresse: '',
    password: '',
})

const rules = computed(() => {
    return {
        email: {required, email},
        password: {required, minLength: minLength(8)},
        name: {required},
        telephone: { required, numeric }
    }
})

const v$ = useVuelidate(rules, state)

const submit = () => {
    v$.value.$touch();
    if(!v$.value.$error) {
        useClient.createClient(state).then(res => {
            state.email = '';
            state.name = '';
            state.prenom = '';
            state.telephone = '';
            state.adresse = '';
            state.password = '';
        })
    }
    console.log(v$.value)
}

</script>