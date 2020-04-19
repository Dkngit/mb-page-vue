<template>
    <el-dialog title="成员编辑" :visible.sync="show" :close-on-click-modal="false">
        <el-form ref="form" :model="obj" :rules="rules.user">
            <el-form-item label="成员名" prop="name" :rules="rules.username">
                <el-input v-model="obj.name"/>
            </el-form-item>
            <template v-if="!obj.id">
                <el-form-item label="用户名" prop="user.username">
                    <el-input v-model="obj.user.username"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="user.email">
                    <el-input v-model="obj.user.email"/>
                </el-form-item>
                <el-form-item label="密码" prop="user.newPassword">
                    <el-input v-model="obj.user.newPassword" show-password/>
                </el-form-item>
                <el-form-item label="确认密码" prop="user.verifyPassword">
                    <el-input v-model="obj.user.verifyPassword" show-password/>
                </el-form-item>
            </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import {teamUserSave} from "@/utils/api";
    import {post} from "@/utils/http";

    export default {
        name: 'TeamUserEdit',
        props: {
            id: Number,
            teamId: Number
        },
        data() {
            return {
                obj: {user: {}},
                rules: {
                    user: {
                        username: [
                            {required: true, message: '请输入用户名', trigger: 'blur'},
                            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                        ],
                        email: [
                            {required: true, message: '请输入邮箱', trigger: 'blur'}
                        ],
                        newPassword: [
                            {required: true, message: '请输入密码', trigger: 'blur'},
                            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                        ],
                        verifyPassword: [
                            {
                                validator: (rule, value, callback) => {
                                    if (!value) {
                                        callback(new Error('请再次输入密码'));
                                    } else if (value !== this.obj.user.newPassword) {
                                        callback(new Error('两次输入密码不一致!'));
                                    } else {
                                        callback();
                                    }
                                }, trigger: 'blur'
                            }
                        ]
                    }
                },
                show: false
            }
        },
        computed: {
            // ...mapState(["user"])
        },
        methods: {
            openDialog(model) {
                this.show = true;
                if (model) {
                    this.obj = JSON.parse(JSON.stringify(model));
                    // this.verifyPassword = this.obj.user.password;
                } else {
                    this.obj = {
                        user: {
                            username: null,
                            newPassword: null,
                            email: null,
                            verifyPassword: null
                        },
                        team: {
                            id: this.teamId
                        }
                    }
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
                        post(teamUserSave, this.obj).then(() => {
                            this.onCancel();
                            this.$emit("newModel", this.obj);
                            this.$message.success('提交成功');
                        }).catch(() => {
                            this.$message.fail('提交失败');
                        })
                        this.onCancel();
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
