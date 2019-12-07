<template>
    <div class="div-root">
        <h3>修改密码</h3>
        <el-form ref="form" :model="obj" :rules="rules">
            <el-form-item label="密码" prop="password">
                <el-input v-model="obj.password" show-password autocomplete="off"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="verifyPassword">
                <el-input v-model="obj.verifyPassword" show-password autocomplete="off"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <!--                <el-button>取消</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {post} from "@/utils/http";
    import {mapState} from "vuex";
    import {apiUserPasswordEdit as aupeAPI} from "@/utils/api";

    export default {
        name: 'PasswordEdit',
        props: {
            id: String
        },
        data() {
            return {
                obj: {
                    password: null,
                    verifyPassword: null,
                },
                rules: {
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ],
                    verifyPassword: [
                        {
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    callback(new Error('请确认密码'));
                                } else if (value !== this.obj.password) {
                                    callback(new Error('两次输入密码不一致!'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        const loading = this.$loading({
                            lock: true
                        });
                        post(aupeAPI, {password: this.obj.password}).then(() => {
                            loading.close();
                            this.$message.success('修改成功');
                        }).catch(() => {
                            loading.close();
                            this.$message.error('修改失败');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .div-root {
        width: 600px;
        margin: auto;
    }
</style>
