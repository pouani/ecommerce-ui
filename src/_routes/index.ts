import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//fichier de vérification et récupération du token d'existance du token
import { authGuard, clientGuard } from '../_middleware';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'public',
        component: () => import('../pages/public/Layout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../pages/public/Home.vue'),
            },
            {
                path: '/products',
                name: 'all-product',
                component: () => import('../pages/public/Products.vue'),
            },
            {
                path: '/product/:id',
                name: 'product-detail',
                component: () => import('../pages/public/views/ProductDetail.vue'),
                props: true,
            },
            {
                path: '/categorie/:id',
                name: 'categorie-product',
                component: () => import('../pages/public/views/ListProductCategorie.vue'),
                props: true,
            },
            {
                path: '/commande',
                name: 'commande',
                component: () => import('../pages/public/Order.vue'),
            },
            {
                path: '/suivicommade',
                name: 'suivi-commande',
                component: () => import('../pages/public/CommandeClient.vue'),
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('../pages/public/Register.vue'),
            },
            {
                path: '/contact',
                name: 'contact',
                component: () => import('../pages/public/Contact.vue')
            },
            {
                path: "/:pathMatch(.*)", redirect: "/"
            }
        ],
        
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../pages/admin/Layout.vue'),
        children: [
            {
                path: '/admin',
                name: 'dashboard',
                component: () => import('../pages/admin/dashboard/Dashboard.vue'),
            },
            {
                path: '/produits',
                name: 'list-produits',
                component: () => import('../pages/admin/product/ProductList.vue'),
            },
            {
                path: '/categories',
                name: 'list-categories',
                component: () => import('../pages/admin/product/CategorieList.vue'),
            },
            {
                path: "/clients",
                name: "list-clients",
                component: () => import("../pages/admin/client/ClientList.vue"),
            },
            {
                path: "/clients/create",
                name: "create-client",
                component: () => import("../pages/admin/client/FormClient.vue"),
            },
            {
                path: "/commandes",
                name: "list-commandes",
                component: () => import("../pages/admin/commande/CommandeList.vue"),
            },
            {
                path: "/:pathMatch(.*)", redirect: "/login"
            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/admin/Login.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    if(to.matched[0].name == 'admin') {
        authGuard(to);
    }
    next();
});

router.beforeEach((to, from, next) => {
    console.log(to)
    if(to.matched.length > 1 && to.matched[1].name == 'suivi-commande') {
        clientGuard(to);
    }
    next();
});

export default router;