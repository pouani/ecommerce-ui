<template lang="">
    <div class="order row">
        <Stepper
        class="col-md-7"
            :steps="steps"
            :validations="validation"
        >
            <template #step1>
                <form>
                    <div class="mb-3">
                        <label for="email">Adresse email</label>
                        <input type="email" id="email" placeholder="email@gmail.com" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password">Mot de passe</label>
                        <div class="border rounded form-control d-flex align-items-center">
                            <input :type="typePass" id="password" placeholder="*********" class="border-0 w-100">
                            <i @click="changeType" :class="statePass ? 'fa-eye-slash' : 'fa-sharp fa-eye'" class="fa-solid fi cursor-pointer"></i>
                        </div>
                    </div>
                    <div class="mb-3 text-end">
                        <button class="btn">S'enregistrer pour un compte</button>
                        <button class="btn btn-primary rounded-32">Se connecter</button>
                    </div>
                </form>
            </template>
            <template #step2>
                <div>
                    <form>
                        <div class="mb-3">
                            <label for="adresse1">Adresse 1</label>
                            <input type="text" id="adresse1" placeholder="eg: kotto chefferie" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="adresse2">Adresse 2</label>
                            <input type="text" id="adresse2" placeholder="eg: bonamoussadi" class="form-control">
                        </div>
                        <div class="mb-3 d-flex gap-2 justify-content-between">
                            <div>
                                <label for="codepostal">Code Postal</label>
                                <input type="text" id="codepostal" placeholder="12 D VIII" class="form-control">
                            </div>
                            <div>
                                <label for="frais">Frais de livraison</label>
                                <input type="text" id="frais" placeholder="gratuit" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </template>
            <template #step3>
                <div>
                    compte paiement
                </div>
            </template>
            <template #step4>
                <div>
                    Compte confirmation et soumission
                </div>
            </template>
        </Stepper>
        <div class="order-summary col-md">
            Détails commande
        </div>
    </div>
</template>
<script setup>
import Stepper from '../../components/Stepper.vue'
import { reactive, ref } from 'vue'

const steps = reactive([
    { title: 'Compte', slotName: 'step1' },
    { title: 'Adresse', slotName: 'step2' },
    { title: 'Paiement', slotName: 'step3' },
    { title: 'Confirmation', slotName: 'step4'}
])

const validation = ref(true)

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
</script>