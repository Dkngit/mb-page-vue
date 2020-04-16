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
                    <el-menu-item index="11">队伍</el-menu-item>
                    <el-menu-item index="21">用户</el-menu-item>
                    <el-submenu index="99" style="float: right">
                        <template slot="title">{{user.username}}</template>
                        <el-menu-item index="99-1">修改密码</el-menu-item>
                        <el-menu-item index="99-99" @click="onLogout()">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div style="display: flex;justify-content: center;box-sizing: content-box">
                <router-view style="width: 90%;"/>
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
                menus: [
                    {index: '11', route: 'teams'},
                    {index: '21', route: 'users'},
                    {index: '99-1', route: 'passwordEdit'}
                ]
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
            handleSelect(index, indexPath) {
                console.log(index, indexPath);
                // if (index !== this.activeIndex) {
                //     const menu = this.menus.find(item => {
                //         return item.index === index;
                //     });
                //     if (menu) {
                //         this.to(menu.route);
                //     }
                // }

                const menu = this.menus.find(item => {
                    return item.index === index;
                });
                if (menu) {
                    this.to(menu.route);
                }
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

            const routeName = this.$router.currentRoute.name;
            if (routeName) {
                const menu = this.menus.find(item => {
                    return item.route === routeName;
                });
                if (menu) {
                    this.activeIndex = menu.index;
                }
            }
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
