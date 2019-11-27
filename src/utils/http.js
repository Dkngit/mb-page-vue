import axios from 'axios'
// import {checkLogin} from "@/components/CheckLogin";
// import VueRouter from "vue-router";

const instance = axios.create({
    baseURL: 'http://localhost:8083',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

const get = (url) => {
    // if (checkLogin()) {
    //     return instance.get(url)
    // }
    // VueRouter.push({
    //     name: 'login'
    // })
    return instance.get(url)
};
const post = (url, data) => {
    // if (checkLogin()) {
    //     return instance.post(url, data)
    // }
    // VueRouter.push({
    //     name: 'login'
    // })
    return instance.post(url, data)
};
export {get, post}
