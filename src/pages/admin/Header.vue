<template lang="">
    <div class="px-4 py-2 bg-white">
        <div class="d-flex justify-content-end gap-2 align-items-center" >
            <li class="list-none">
                <i class="fa-regular fa-bell"></i>
            </li>
            <b-nav-item-dropdown :text="auth?.user?.name" right class="list-none">
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item @click="auth.logout()" href="#" class="text-danger">Se deconnecter</b-dropdown-item>
                <b-dropdown-item href="#">Administrateur</b-dropdown-item>
            </b-nav-item-dropdown>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../_store'

const auth = useAuthStore();

onMounted(() => {
    if(auth.isAuthenticated){
        auth.setUser()
    }
})
</script>