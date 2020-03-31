<template>
    <el-dialog title="收货地址" :visible="show" v-on:update:visible="onVisibleChange">
        <el-form ref="form" label-position="left" label-width="80px" :model="obj" :rules="rules">
            <el-form-item label="队伍名称" prop="name">
                <el-input v-model="obj.name"/>
            </el-form-item>
            <el-form-item label="说明">
                <el-input v-model="obj.description"/>
            </el-form-item>
            <!--            <el-form-item>-->
            <!--                <el-button type="primary" @click="onSubmit()">提交</el-button>-->
            <!--                <el-button>取消</el-button>-->
            <!--            </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import {post} from "../utils/http";
    import {teamSave} from "../utils/api";

    export default {
        name: "TeamEdit",
        props: {
            show: Boolean,
            model: Object
        },
        watch: {
            show(newV) {
                if (newV === true) {
                    if (this.model) {
                        this.obj = JSON.parse(JSON.stringify(this.model));
                    } else {
                        this.obj = {}
                    }
                    if (this.$refs.form)
                        this.$refs.form.resetFields();
                }
            }
        },
        data() {
            return {
                obj: {},
                rules: {
                    name: [
                        {required: true, message: '队伍名称必填', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onVisibleChange(bool) {
                this.$emit('update:show', bool);
            },
            onCancel() {
                this.onVisibleChange(false);
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        post(teamSave, this.obj).then(() => {
                            this.onCancel();
                            this.$emit("newModel", this.obj);
                            this.$message.success('提交成功');
                        }).catch(() => {
                            this.$message.fail('提交失败');
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

<style scoped>

</style>