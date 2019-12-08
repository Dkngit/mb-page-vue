<template>
    <div>
        <div v-if="user">
            <div class="app-header">
                <el-menu
                        :default-active="activeIndex"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="11" @click="to('teams')">队伍们</el-menu-item>
                    <el-submenu index="99" style="float: right">
                        <template slot="title">{{user.username}}</template>
                        <el-menu-item index="99-1" @click="to('passwordEdit')">修改密码</el-menu-item>
                        <el-menu-item index="99-99" @click="onLogout()">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div>
                <router-view/>
            </div>
        </div>
        <div v-else>
            <Login/>
        </div>
    </div>

</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import Base from "@/components/Base";
    import Login from "@/views/Login";
    import {post} from "@/utils/http";

    export default {
        mixins: [Base],
        name: 'app',
        components: {
            Login
        },
        data() {
            return {
                isAtRoot: false,
                activeIndex: '1',
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            ...mapMutations(["setUser"]),
            onLogout() {
                const loading = this.$loading({
                    lock: true
                });
                post("/logout").then(res => {
                    console.log(res);
                    this.setUser(null);
                }).finally(() => loading.close())
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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

<style lang="stylus" scoped>
    .app-header {
        margin-bottom 5px
    }

    .el-menu-user {
        float right
    }

</style>
