<template lang="">
    <div class="admin d-flex">
        <Sidebar />
        <div class="dashboard">
            <div class="">
                <Header />
                <div class="px-4 py-3">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Sidebar from "./Sidebar.vue"
import Header from "./Header.vue"
</script>