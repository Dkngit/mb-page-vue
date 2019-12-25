<template>
    <div class="div-root">
        <el-button @click="onLoad()">刷新</el-button>
        <el-button @click="openAdd()">添加</el-button>
        <el-table v-loading="loading"
                  :data="list"
                  style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="createOn"
                    label="修改日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="modifyOn"
                    label="创建日期"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
            <!--            <el-table-column-->
            <!--                    prop="address"-->
            <!--                    label="地址">-->
            <!--            </el-table-column>-->
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :total="totalPages">
        </el-pagination>
    </div>
</template>

<script>


    import {post} from "@/utils/http";
    import {teamDelete, teamList, teamSave} from "@/team/team_api";

    export default {
        name: "Teams",
        data() {
            return {
                list: null,
                loading: false,
                pageIndex: 0,
                pageSize: 10,
                totalPages: 1
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
                post(teamDelete, {id: row.id}).then(res => {
                    console.log(res);
                    this.list.splice(index, 1);
                })
            },
            onLoad() {
                if (!this.loading) {
                    this.loading = true;
                    post(teamList, {
                        pageIndex: this.pageIndex, pageSize: this.pageSize
                    }).then(res => {
                        console.log(res);
                        this.list = res.data.content;
                        this.totalPages = res.data.totalPages;
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => this.loading = false)
                }
            },
            openAdd() {
                this.$prompt('请输入队伍名', '创建队伍', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: (e) => {
                        return !!e;
                    }
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '你的邮箱是: ' + value
                    // });
                    post(teamSave, {name: value}).then(res => {
                        console.log(res);
                    })
                })
            }
        },
        created() {
            this.onLoad();
        }

    }
</script>

<style lang="stylus" scoped>

    .div-root {
        width: 80%;
        margin: auto;
    }
</style>