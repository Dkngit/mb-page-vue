<template>
    <el-dialog title="收货地址" :visible.sync="show">
        <el-form ref="form" :model="obj" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="obj.username"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="obj.email"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="obj.password" show-password/>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
                <el-input v-model="verifyPassword" show-password/>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--                <el-button type="primary" @click="onSubmit">提交</el-button>-->
            <!--                <el-button @click="$router.back()">取消</el-button>-->
            <!--            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {mapState} from "vuex";
    import {post} from "@/utils/http";
    import {userSave} from "@/utils/api";

    export default {
        name: 'TeamUserEdit',
        props: {
            id: Number
        },
        data() {
            return {
                obj: {
                    username: null,
                    password: null,
                    email: null
                },
                verifyPassword: null,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                    ]
                },
                show: false
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            openDialog(model) {
                this.show = true;
                if (model) {
                    this.obj = JSON.parse(JSON.stringify(model));
                } else {
                    this.obj = {}
                }
                if (this.$refs.form)
                    this.$refs.form.resetFields();
            },
            onCancel() {
                this.show = false;
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        // post()
                        post(userSave, this.obj).then(() => {
                            this.onCancel();
                            this.$emit("newModel", this.obj);
                            this.$message.success('提交成功');
                        }).catch(() => {
                            this.$message.fail('提交失败');
                        })
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
</style>
