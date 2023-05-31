import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//fichier de vérification et récupération du token d'existance du token
import { authGuard } from '../_middleware';


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
                path: '/commande',
                name: 'commande',
                component: () => import('../pages/public/Order.vue'),
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
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    if(to.matched[0].name == 'admin') {
        console.log(to.matched[0].name)
        authGuard(to);
    }
    next();
});

export default router;