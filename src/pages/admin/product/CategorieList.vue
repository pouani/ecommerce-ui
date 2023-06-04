<template lang="">
    <div>
        <div class="mx-1">
            <button class="btn">back</button>
        </div>
        <div class="default px-md-3">
            <div class="d-flex justify-content-between my-3">
                <h4>Categorie</h4>
                <button 
                    @click="modalShow = true, update = false"
                    type="button" class="btn bg-primary text-white"
                >+ categorie</button>
            </div>
            <ul class="row gray-600 list-none p-0 m-0">
                <li class="col-1 col-md-1">#</li>
                <li class="col col-md">Nom</li>
                <li class="d-none d-md-block col col-md">Description</li>
                <li class="d-none d-md-block col col-md">Code</li>
                <li class="d-none d-md-block col col-md">Status</li>
                <li class="col col-md text-center">Action</li>
            </ul>
            <ul 
                v-for="(item, index) in useCategorie?.categories" :key="index"
                class="row default align-items-center default py-2 rounded bg-white list-none p-0 mx-0 mb-1">
                <li class="col-1 col-md-1 fwb">{{ index + 1}}</li>
                <li class="col col-md">{{ item.nomCategorie }}</li>
                <li class="d-none d-md-block col col-md">{{useTruncate(item.description, 20)}}</li>
                <li class="d-none d-md-block col col-md">{{ item.codeCategorie }}</li>
                <li class="col col-md">
                    <span 
                        class="rounded-32 py-1 px-2"
                        :class="item.status ? 'bg-success' : 'text-danger'"
                    >{{ item.status ? 'avec produits' : 'sans produits' }}</span>
                </li>
                <li class="col col-md text-center">
                    <button type="button" 
                        @click="getOne(item.id)"
                        class="btn default"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button :disabled="item.status == true" type="button"
                        @click="deleteCategorie(item.id)"
                        class="btn text-danger bg-trash mx-1"
                    ><i class="fa-solid fa-trash"></i></button>
                </li>
            </ul>
            <div v-if="!useCategorie?.categories.length" class="d-flex justify-content-center pt-5">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
        </div>
        <b-modal v-model="modalShow" hide-footer title="Nouvelle Categorie" hide-header-close centered>
            <form action="" class="default">
                <div class="form-group mb-2">
                    <label for="nom">Designation</label>
                    <input v-model="state.designation" type="text" class="form-control">
                    <em v-if="v$.designation.$error" class="text-end text-danger list-none">
                        Veillez fournir la designation
                    </em>
                </div>
                <div class="form-group mb-2">
                    <label for="nom">Description</label>
                    <textarea v-model="state.description" name="" id="" cols="15" rows="5" class="form-control"></textarea>
                    <em v-if="v$.description.$error" class="text-end text-danger list-none">
                        Veillez fournir la description
                    </em>
                </div>
                <button 
                    type="button" class="btn btn-primary w-100"
                    @click="submit()"
                >J'ajoute la categorie</button>
            </form>
        </b-modal>
    </div>
</template>
<script setup>
import { useTruncate } from "../../../_utils/useTruncate";
import { ref, reactive, computed, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useCategorieStore } from "../../../_store"

import Swal from 'sweetalert2'

const useCategorie = useCategorieStore()

const perPage = ref(3);
const currentPage =  ref(1);

const rows = computed(() => {
    return useCategorie.categories.length
});

const update = ref(false)

const categorieData = ref({})
function getOne(categori){
    modalShow.value = true
    update.value = true;
    useCategorie.getOneCategories(categori)
    categorieData.value = useCategorie.categorie;
    console.log(update.value)
}

const state = reactive({
    designation: '',
    description: '',
});

const rules = computed(() => {
    return {
        designation: {required},
        description: {required}
    }
})

const v$ = useVuelidate(rules, state)

const modalShow = ref(false)

const submit = () => {
    v$.value.$validate()
    if(!v$.value.$error){
        useCategorie.createCategorie(state).then(() => {
            modalShow.value = false
            Swal.fire(
                'Categorie créé avec success.',
                'success'
            )
        })
    }else{
        console.log(v$.value)
    }
}

const deleteCategorie = (id) => {
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
        useCategorie.deleteCategorie(id)
        Swal.fire(
        'Spprimer!',
        'Votre produit a ete supprimer.',
        'success'
        )
    }
    })
}
onMounted(() =>{
    useCategorie.getAllCategories()
})
</script>