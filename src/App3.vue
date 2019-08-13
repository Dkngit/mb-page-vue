<template>
  <div>
    <div v-if="isAtRoot">
      <router-link class="a-css" to="/home">Home</router-link>
      <router-link class="a-css" to="/about">About</router-link>
      <router-link class="a-css" to="/login">Login</router-link>
      <router-link class="a-css" to="/loginIn">LoginIn</router-link>
    </div>
    <router-view v-if="!isAtRoot"/>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                isAtRoot: true
            }
        },
        methods: {
            to(name, params) {
                this.$router.push({
                    name: name,
                    params: params
                });
            },
            replace(name) {
                this.$router.replace({
                    name: name
                });
            }
        },
        created() {
            this.isAtRoot = this.$router.currentRoute.path === '/';
            this.$router.beforeEach((to, from, next) => {
                if (from.path === '/') {
                    this.isAtRoot = false;
                }
                if (to.path === '/') {
                    this.isAtRoot = true;
                }
                next();
            });
        }
    }
</script>

<style lang="stylus">
  .a-css
    margin 5px

</style>
