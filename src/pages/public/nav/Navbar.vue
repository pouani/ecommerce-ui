<template lang="">
    <div>
        <b-navbar toggleable="lg" type="dark" class="border-bottom">
            <b-navbar-brand href="#">
                SK-MARKET
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <div class="d-md-flex justify-content-between align-items-center w-100">
                    <ul class="list-none m-0 d-md-flex gap-3">
                        <router-link exact class="h-content" :to="{ name: 'Home' }">
                            Accueil
                        </router-link>
                        <li>
                            <b-nav-item-dropdown text="Categorie" right>
                                <b-dropdown-item href="#" v-for="(item, index) in useCategorie.categories" :key="index">
                                    <router-link :to="{name: 'categorie-product', params: { id: item.id } }">
                                        {{item.nomCategorie}}
                                    </router-link>
                                </b-dropdown-item>
                            </b-nav-item-dropdown>
                        </li>
                        <router-link exact class="h-content" :to="{ name: 'all-product' }">
                            Produits
                        </router-link>
                        <router-link v-if="useClient?.token != null"
                                :to="{ name: 'suivi-commande' }" 
                                class="h-content"
                            >
                                Mes Commandes
                        </router-link>
                        <!-- <li class="h-content" href="#">Livraison</li> -->
                        <router-link class="h-content" :to="{ name: 'contact' }">
                            Contact
                        </router-link>
                    </ul>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto gap-4">
                        <!-- <b-nav-form class="border">
                            <b-form-input size="sm" class="mr-sm-2" placeholder="Rechercher un produit"></b-form-input>
                            <button class="btn" type="submit">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </b-nav-form> -->
                        <div class="d-flex gap-2 align-items-center">
                            <button class="btn" @click="useCart.showCart = !useCart.showCart">
                                <span class="cart-quantity">
                                    {{ quantity }}
                                </span>
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
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../../../_store/carts'
import { useCategorieStore } from '../../../_store'
import { useAuthStore } from '../../../_store'
import { useClientStore } from '../../../_store'


const useClient = useClientStore();


const auth = useAuthStore();

const useCategorie = useCategorieStore()

const useCart = useCartStore()

const quantity = ref(0)
quantity.value = computed(() => useCart.getCartQuantity)



onMounted(() => {
    useCategorie.getAllCategories()
})
</script>