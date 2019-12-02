<template>
    <div>
        <div v-if="user">
            <div class="app-header">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    服务列表<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--                <div>Header</div>-->
                <div class="app-header-info">
                    <div class="user-info" @click="to('userEdit')">{{user.name}}</div>
                    <el-button type="danger" round plain size="small">退出</el-button>
                </div>
            </div>
            <div>
                <router-view/>
            </div>
        </div>
        <div v-else>
            <Login></Login>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    import Base from "@/components/Base";
    import Login from "@/views/Login";

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

<style lang="stylus" scoped>
    .a-css
        margin 5px

    .app-header
        box-sizing border-box
        width 100%
        display flex
        justify-content: space-between
        align-items: center
        background-color: #6e9eff;
        color white
        padding 0 20px
        /*box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px;*/
        margin-bottom 5px

    .app-header-info
        align-self right

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
