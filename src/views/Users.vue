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
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="createOn"
                    label="创建日期"
                    width="180"
                    :formatter="dateFormat"
            >
            </el-table-column>
            <el-table-column
                    prop="modifyOn"
                    label="修改日期"
                    width="180"
                    :formatter="dateFormat"
            >
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
    import {post} from '@/utils/http'
    import {dateFormat_lll} from "@/utils/moment";
    import {userDelete, userList} from "@/utils/api";

    export default {
        name: 'Users',
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
            dateFormat(row, column, cellValue) {
                // console.log('dateFormat',row,column,cellValue,index);
                return dateFormat_lll(cellValue)
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({
                    name: 'userEdit',
                    query: {id: row.id}
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('确认删除？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    post(userDelete, {id: row.id}).then(res => {
                        console.log(res);
                        this.list.splice(index, 1);
                        this.$message.success('删除成功');
                    }).catch(() => {
                        this.$message.error('删除失败');
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onLoad() {
                if (!this.loading) {
                    this.loading = true;
                    post(userList, {
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
                // this.$prompt('请输入队伍名', '创建队伍', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     inputValidator: (e) => {
                //         return !!e;
                //     }
                // }).then(({value}) => {
                //     post(teamSave, {name: value}).then(res => {
                //         console.log(res);
                //         this.$message.success('添加成功');
                //     }).catch(() => this.$message.error('添加失败')).finally(() => this.onLoad())
                // })
                this.$router.push('userEdit');
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
