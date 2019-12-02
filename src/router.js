import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Users from "@/user/Users";
import UserEdit from "@/user/UserEdit";

Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '/userEdit',
            name: 'userEdit',
            component: UserEdit,
            props: (route) => (route.query)
        }
    ]
})
