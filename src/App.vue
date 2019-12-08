<template>
    <div>
        <div v-if="user">
            <div class="app-header">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    服务列表<i class="el-icon-arrow-down el-icon--right"/>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="app-header-item">队伍管理</div>
                <!--                <div>Header</div>-->
                <div class="app-header-info">
                    <div class="user-info" @click="to('passwordEdit')">{{user.username}}</div>
                    <el-button type="danger" round plain size="small" @click="onLogout()">退出</el-button>
                </div>
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
                trees: [
                    {label: '用户', link: 'users'},
                    {label: '一级 1'}
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
        box-sizing border-box
        width 100%
        display flex
        /*justify-content: space-between*/
        align-items: center
        background-color: #6e9eff;
        color white
        padding 0 20px
        /*box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;*/
        margin-bottom 5px
    }

    .app-header-item {
        margin 0 8px
        font-size 14px
    }

    .app-header-info
        margin-left auto

    .el-dropdown-link {
        cursor: pointer;
        /*color: #409EFF;*/
        color white
    }

    .user-info {
        cursor: pointer;
        display inline-block
        margin-right 10px
    }
</style>
