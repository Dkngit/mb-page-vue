import router from '@/router'
import {checkLogin} from "@/components/CheckLogin";

export default {
    name: "Base",
    methods: {
        to(name, query) {
            console.log("router", router.currentRoute);
            if (router.currentRoute.name !== name) {
                if (!checkLogin()) {
                    name = 'login'
                }
                router.push({
                    name: name,
                    query: query
                });
            }

        }
    }
}
