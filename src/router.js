import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Users from "@/views/Users";
import UserEdit from "@/views/UserEdit";
import PasswordEdit from "@/views/PasswordEdit";
import Teams from "@/views/Teams";
import TeamUsers from "@/views/TeamUsers";

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
        },
        {
            path: '/teams',
            name: 'teams',
            component: Teams,
            props: (route) => (route.query)
        },
        {
            path: '/teamUsers',
            name: 'teamUsers',
            component: TeamUsers,
            props: (route) => (route.query)
        }
    ]
})
