<template>
    <el-container>
        <el-header>
            <div>Header</div>
            <div v-if="loginInfo">
                {{loginInfo.name}}
            </div>
            <div v-else>
                <el-button type="primary" @click="to('login')">登录</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-tree :data="trees" @node-click="onNodeClick"></el-tree>
            </el-aside>
            <el-container>
                <el-main>
                    <div v-if="isAtRoot">
                        <router-link class="a-css" to="/login">Login</router-link>
                    </div>
                    <router-view/>
                </el-main>
                <!--        <el-footer>Footer</el-footer>-->
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import Base from "@/components/Base";

    export default {
        mixins: [Base],
        name: 'app',
        data() {
            return {
                isAtRoot: false,
                trees: [
                    {label: '用户', link: 'users'},
                    {label: '一级 1'}
                ]
            }
        },
        computed: {
            ...mapState(["loginInfo"])
        },
        methods: {
            onNodeClick(data) {
                console.log(data);
                this.$router.push({
                    name: data.link
                })
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
