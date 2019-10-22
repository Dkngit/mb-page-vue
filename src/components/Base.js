import Router from 'vue-router'

export default {
    name: "Base",
    methods: {
        to(name, query) {
            Router.push({
                name: name,
                query: query
            });
        }
    }
}