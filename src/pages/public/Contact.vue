<template lang="">
    <div class="contact">
        <div class="d-flex justify-content-center">
            <form v-if="storeContact.contact.adresse == ''" action="" class="bg-white px-4 py-3 rounded" style="max-width: 25rem; width: 100%;">
                <div class="mb-3 w-100">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" v-model="state.email" class="form-control" id="email" placeholder="name@example.com">
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Votre message</label>
                    <textarea v-model="state.message" class="form-control" id="message" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="adresse" class="form-label">Adresse</label>
                    <input v-model="state.adresse" type="text" class="form-control" id="adresse" placeholder="Kotto Bonamoussadi">
                </div>
                
                <button v-if="storeContact.status" type="button" class="btn btn-primary">
                    <b-spinner class="white" label="Spinning"></b-spinner>
                </button>
                <button v-if="!storeContact.status" type="button" class="btn btn-primary" @click="submit">Je laisse mon message</button>
            </form>
            <div v-if="storeContact.contact.adresse != ''" class="shadow py-5 px-4 text-success bg-white rounded d-flex align-items-center">
                <i class="fa-solid fa-circle-info fa-2x mx-1"></i>Votre Message a été transmis avec succès
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useContactStore } from '../../_store/contact'

const storeContact = useContactStore()

const state = reactive({
    message: '',
    email: '',
    adresse: '',
})

const submit = () => {
    storeContact.setContact(state).then(res => {
        storeContact.status = true;
    })
}
</script>