<template>
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
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "TeamEdit",
        data() {
            return {
                obj: {},
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
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        // post()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>