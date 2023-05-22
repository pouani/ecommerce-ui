<template lang="">
    <div class="p-4">
        <Stepper
            :steps="steps"
            :validations="validation"
        >
            <template #step1>
                <form>
                    Compte de connexion
                    <div class="mb-3">
                        <label for="email">Adresse email</label>
                        <input type="email" id="email" placeholder="email@gmail.com" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="password">Mot de passe</label>
                        <input type="password" id="password" placeholder="*********" class="form-control">
                    </div>
                    <div class="mb-3">
                        <button class="btn">S'enregistrer pour un compte</button>
                        <button class="btn btn-primary">Se connecter</button>
                    </div>
                </form>
            </template>
            <template #step2>
                <div>
                    Compte adresse
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
</script>