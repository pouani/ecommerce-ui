<template lang="">
    <nav 
        class="sidebar"
        :class="close ? 'close' : ''"
    >
            <header>
                <div class="image-text">

                    <div class="text header-text">
                        <h4 class="profession">SkySoft</h4>
                    </div>
                </div>

                <svg 
                    @click="close = !close"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3 toggle cursor-pointer mt-2">
                    <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                </svg>              
            </header>

            <div class="menu-bar">
                <div class="menu">
                    <li class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>                     
                        <input type="text" placeholder="search...">                            
                    </li>
                    <ul class="menu-links p-0">
                        <li class="nav-link">
                            <router-link :to="{ name: 'dashboard' }" href="#">
                                <i class="fa-solid fa-house icon"></i>
                                <span class="text nav-text">Dashboard</span>                             
                            </router-link>
                        </li>
                        <li class="nav-link">
                            <a href="#">
                                <i class="fa-solid fa-list icon"></i>                            
                                <span class="text nav-text">Produits</span>                             
                            </a>
                        </li>
                        <li class="nav-link">
                            <a href="#">
                                <i class="fa-solid fa-list-ul icon"></i>                                                         
                                <span class="text nav-text">Commandes</span>                             
                            </a>
                        </li>
                        <li class="nav-link">
                            <a href="#">
                                <i class="fa-solid fa-users icon"></i>                                                          
                                <span class="text nav-text">Clients</span>                             
                            </a>
                        </li>
                        <li class="nav-link">
                            <a href="#">
                                <i class="fa-solid fa-chart-simple icon"></i>                             
                                <span class="text nav-text">Analytics</span>                             
                            </a>
                        </li>
                        <li class="nav-link">
                            <a href="#">
                                <i class="fa-solid fa-gear icon"></i>                             
                                <span class="text nav-text">Roles</span>                             
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="bottom-content">
                    <li class="">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>                                                        
                            <span class="text nav-text">Deconnexion</span>                             
                        </a>
                    </li>
                </div>
            </div>
        </nav>
</template>
<script setup>
import { ref, computed } from 'vue'

const close = ref(true)
</script>
