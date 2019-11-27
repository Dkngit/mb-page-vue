import Router from 'vue-router';
import {checkLogin} from "@/components/CheckLogin";

export default {
    name: "Base",
    methods: {
        to(name, query) {
            if (!checkLogin()) {
                name = 'login'
            }
            Router.push({
                name: name,
                query: query
            });
        }
    }
}
