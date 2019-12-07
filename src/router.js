import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Users from "@/user/Users";
import UserEdit from "@/user/UserEdit";
import PasswordEdit from "@/user/PasswordEdit";

Vue.use(Router);


export default new Router({
    routes: [
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
        },
        {
            path: '/passwordEdit',
            name: 'passwordEdit',
            component: PasswordEdit,
            props: (route) => (route.query)
        }
    ]
})
