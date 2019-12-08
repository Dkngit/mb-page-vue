<template>
    <div style="width: 100%">
        <div class="form">
            <el-form ref="form" :model="obj">
                <el-form-item label="用户名">
                    <el-input v-model="obj.username"/>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="obj.password" show-password=""/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <!--                    <el-button @click="onTest">忘记密码</el-button>-->
                    <!--                    <el-button @click="getUserInfo">getUserInfo</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {get} from "@/utils/http";
    import {mapMutations} from 'vuex'
    import {userLogin} from "@/utils/api";

    export default {
        name: 'login',
        components: {},
        data() {
            return {
                obj: {username: 'admin', password: 'admin'}
            }
        },
        methods: {
            ...mapMutations(["setUser"]),
            onSubmit() {
                get(userLogin, {
                    auth: {username: this.obj.username, password: this.obj.password}
                }).then(response => {
                    console.log(response);
                    this.setUser(response.data);
                }).catch(error => {
                    console.log(error);
                    if (error.response) {
                        let httpStatus = error.response.status;
                        console.log(httpStatus);
                        let text = '未知错误';
                        switch (httpStatus) {
                            case 401:
                                text = '用户名或密码错误';
                                break;
                            case 500:
                                text = '服务器异常';
                                break;
                        }
                        this.$message.error(text);
                    }
                })
            },
            // onTest() {
            //     get('/resource').then(response => {
            //         console.log(response)
            //     })
            // },
            // getUserInfo() {
            //     get(apiUserOwn).then(response => {
            //         console.log(response);
            //         this.setLoginInfo(response.data);
            //     }).catch(error => console.log(error))
            // }
        }
    }
</script>

<style lang="stylus" scoped>
    .form
        width 50%
        margin auto
</style>
