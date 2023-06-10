<template lang="">
    <div class=" d-flex justify-content-center">
        <form action="" class="shadow rounded bg-white px-4 py-3" style="width: 25rem;">
            <div class="form-group">
              <label for="">Email</label>
              <input v-model="state.email" type="email" class="form-control" placeholder="">
            </div>
            <div class="form-group">
              <label for="name">Nom</label>
              <input v-model="state.name" type="text" id="name" class="form-control" placeholder="">
            </div>
            <div class="form-group">
              <label for="prenom">Prenom</label>
              <input v-model="state.prenom" type="text" id="prenom"  class="form-control" placeholder="">
            </div>
            <div class="form-group">
              <label for="psw">Mot de passe</label>
              <input v-model="state.password" type="password" id="psw" class="form-control" placeholder="">
            </div>

            <div class="mb-2">
                    <label for="formFile" class="form-label">Image</label>
                    <input @change="handleFileInputChange" class="form-control" type="file" id="formFile">
                </div>

            <button 
                @click="submit()"
                type="button" class="btn btn-primary">S'enregistrer</button>
        </form>
    </div>

</template>
<script setup>
import { ref, reactive, computed } from 'vue'

import { useAuthStore } from '../../../_store' 
// c'est 
// Je n'ai pas de connaissance en Vue Js donc si tu connais comment 
//récupérer le byte tu le fait et tu l'envoi au backend avec le nom de l'image

const useAuth = useAuthStore()
const state = reactive({
    name: '',
    prenom: '',
    password: '',
    photo: 'null',
    photoBytes: null,
})

const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    state.photo =  file.name;
    const reader = new FileReader();
    reader.onload = () => {
        state.photoBytes = Array.from(new Uint8Array(reader.result));
        // state.extension = file.name.split('.').pop();

        console.log("photo byte == ",state.photoBytes)
    };
    console.log("photo name == ",state.photo)
    reader.readAsArrayBuffer(file);
}

const submit = () => {
    useAuth.createUser(state);
}
</script>