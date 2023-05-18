<template lang="">
    <div class="public">
        <NavbarTop />
        <Navbar />
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
</script>