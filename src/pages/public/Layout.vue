<template lang="">
    <div class="public">
        <div class="position-fixed w-100 z-99 mb-4">
            <NavbarTop />
            <Navbar />
        </div>
        <Transition name="bounce">
            <Sidebar />
        </Transition>
        <div class="public-layout">
            <router-view />
        </div>
        <Footer />
    </div>
</template>
<script setup>
import NavbarTop from './nav/NavbarTop.vue'
import Navbar from './nav/Navbar.vue'
import Footer from './nav/Footer.vue'
import Sidebar from './nav/Sidebar.vue'
</script>