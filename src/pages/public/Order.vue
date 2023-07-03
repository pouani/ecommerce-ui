<template lang="">
    <div class="order row">
        <Stepper
        class="col-md-7"
            :steps="steps"
            :validations="validation"
            :submit="submit"
        >
            <template #step1>
                <form v-if="!validation">
                    <div class="mb-3">
                        <label for="email">Adresse email</label>
                        <input type="email" v-model="form.email" id="email" placeholder="email@gmail.com" class="form-control">
                        <em v-if="v$.email.$error" class="text-end text-danger list-none mb-5">
                            Veillez fournir l'email
                        </em>
                    </div>
                    <div class="mb-3">
                        <label for="password">Mot de passe</label>
                        <div class="border rounded form-control d-flex align-items-center">
                            <input :type="typePass" v-model="form.password" id="password" placeholder="*********" class="border-0 w-100">
                            <i @click="changeType" :class="statePass ? 'fa-eye-slash' : 'fa-sharp fa-eye'" class="fa-solid fi cursor-pointer"></i>
                        </div>
                        <em v-if="v$.password.minLength.$invalid" class="text-end text-danger list-none">
                            doit contenir au moins {{ v$.password.minLength.$params.min }} caractères. <br>
                        </em>
                        <em v-if="v$.password.$error" class="text-end text-danger list-none">
                            Veillez fournir le mot de passe
                        </em>
                    </div>
                    <div class="mb-3 text-end">
                        <router-link :to="{name: 'register'}" class="btn border-primary mx-1 rounded-32">S'enregistrer pour un compte</router-link>
                        <button v-if="!useClient.loading" @click="submitForm" type="button" class="btn btn-primary rounded-32">Se connecter</button>
                        <button
                            v-if="useClient.loading"
                            type="button"
                            class="btn btn-primary rounded-32">
                            <b-spinner variant="white" label="Spinning"></b-spinner>
                        </button>
                    </div>
                </form>
                <div class="info" v-if="validation">
                    <ul class="list-none p-0">
                        <li class="d-flex justify-content-between">
                            <p>Email : </p>
                            <p class="fwb">{{useClient.client.username}}</p>
                        </li>
                        <li class="d-flex justify-content-between">
                            <p>Nom : </p>
                            <p class="fwb">{{useClient.client.name}}</p>
                        </li>
                    </ul>
                </div>
            </template>
            <template #step2>
                <div>
                    <form class="disabled">
                        <div class="mb-3">
                            <label for="adresse1">Adresse 1</label>
                            <input disabled type="text" id="adresse1" placeholder="eg: kotto chefferie" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="adresse2">Adresse 2</label>
                            <input disabled type="text" id="adresse2" placeholder="eg: bonamoussadi" class="form-control">
                        </div>
                        <div class="mb-3 d-flex gap-2 justify-content-between">
                            <div>
                                <label for="codepostal">Code Postal</label>
                                <input disabled type="text" id="codepostal" placeholder="12 D VIII" class="form-control">
                            </div>
                            <div>
                                <label for="frais">Frais de livraison</label>
                                <input disabled type="text" id="frais" placeholder="gratuit" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </template>
            <template #step3>
                <div>
                    moyens de paiements (Encours d'integration)
                </div>
            </template>
            <template #step4>
                <div class="info" v-if="validation">
                    <ul class="list-none p-0">
                        <li class="d-flex justify-content-between">
                            <p>Nom : </p>
                            <p class="fwb">{{useClient.client.name}}</p>
                        </li>
                        <li class="d-flex justify-content-between">
                            <p>Effectue un paiement de <strong>{{ totalPrice }}fcfa</strong> 
                                correspondant a un total de <strong>{{totalQuantity}}</strong> produis chez <strong>SKYSOFT-MARKET</strong></p>
                        </li>
                        <li class="d-flex justify-content-between">
                            <p>Moyen de paiement : </p>
                            <p class="">indisponible</p>
                        </li>
                    </ul>
                </div>
            </template>
        </Stepper>
        <div class="col-md">
            <OrderSummary />
        </div>
    </div>
</template>
<script setup>
import Stepper from '../../components/Stepper.vue'
import OrderSummary from './views/OrderSummary.vue'
import { reactive, ref, computed } from 'vue'
import {useRouter, useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useCartStore } from '../../_store/carts'
import { useClientStore } from '../../_store'
import { useOrderStore } from '../../_store'

const router = useRouter();
const useOrder = useOrderStore()


const useClient = useClientStore();
const useCart = useCartStore()
const steps = reactive([
    { title: 'Compte', slotName: 'step1' },
    { title: 'Adresse', slotName: 'step2' },
    { title: 'Paiement', slotName: 'step3' },
    { title: 'Informations', slotName: 'step4'}
])

const typePass = ref("password");
const statePass = ref(true)
const changeType = () => {
    if(typePass.value == "password"){
        typePass.value = "text"
        statePass.value = false
    }else{
        typePass.value = "password"
        statePass.value = true
    }
}

const ProductMap = computed(() => {
    return useCart.cart.map((item) => {
        return{
            id: item.id
        }
    })
})

const totalPrice = ref(0)
totalPrice.value = computed(() => useCart.getCartTotalPrice)

const totalQuantity = ref(0)
totalQuantity.value = computed(() => useCart.getCartQuantity)

const state = reactive({
    client: computed(() => { return { id: useClient.client?.id}}),
    name: computed(() => 'CMD-' + useClient.client?.name),
    code: computed(() => 'CMD-' + useClient.client?.id),
    date: new Date(),
    produits: ProductMap,
    status: { name: 'En Préparation', value: 'EN_PREPARATION' },
    quantite: computed(() => useCart.getCartQuantity),
})

const form = reactive({
    email: '',
    password: '',
})

const rules = computed(() => {
    return {
        email: {required, email},
        password: {required, minLength: minLength(8)}
    }
})

const v$ = useVuelidate(rules, form)

const submitForm = () => {
    v$.value.$validate()
    if(!v$.value.$error){
        useClient.login(form)
    }else{
        console.log(v$.value)
    }
}

const validation = computed(() => useClient.token != null ? true : false)

const submit = () => {
    console.log(state)
    useOrder.createCommande(state).then(() =>{
        router.push('/suivicommade')
    })
}
</script>