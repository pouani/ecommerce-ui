<template lang="">
    <div>
        <b-navbar toggleable="lg" type="dark" class="border-bottom">
            <b-navbar-brand href="#">
                Sk-M
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <div class="d-md-flex justify-content-between align-items-center w-100">
                    <ul class="list-none m-0 d-md-flex gap-3">
                        <router-link class="h-content" :to="{ name: 'Home' }">
                            Accueil
                        </router-link>
                        <li>
                            <b-nav-item-dropdown text="Categorie" right>
                                <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                                <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                                <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                                <b-dropdown-item href="#">Categorie 1</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </li>
                        <router-link class="h-content" :to="{ name: 'all-product' }">
                            Produits
                        </router-link>
                        <!-- <router-link class="h-content" :to="{ name: 'all-product' }">
                            Produits
                        </router-link>
                        <router-link class="h-content" :to="{ name: 'all-product' }">
                            Produits
                        </router-link> -->
                        <li class="h-content" href="#">Livraison</li>
                        <li class="h-content" href="#">Contact</li>
                    </ul>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto gap-4">
                        <b-nav-form class="border">
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Rechercher un produit"></b-form-input>
                            <button class="btn" type="submit">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </b-nav-form>
                        <div class="d-flex gap-2">
                            <button class="btn">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>

                            <Login />
                        </div>
                    </b-navbar-nav>
                </div>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script setup>
import Login from '../Login.vue'
</script>