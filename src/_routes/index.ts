import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


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
                component: () => import('../pages/public/Commande.vue'),
            },
            {
                path: "/:pathMatch(.*)", redirect: "/"
            }
        ],
        
    },
    {
        path: '/admin',
        name: 'Dashboard',
        component: () => import('../pages/admin/Layout.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
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
    if(to.matched[0].name == 'Dashboard') {
        console.log('Dashboard');
        
    }
    next();
});

export default router;