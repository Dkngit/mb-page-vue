<template>
    <div>
        <el-button @click="fetchList">fetchList</el-button>
        <el-button @click="onEdit">add</el-button>
        <el-table
                :data="list">
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :total="totalPage">
        </el-pagination>
    </div>
</template>

<script>
    import {post} from '@/utils/http'

    export default {
        name: 'Users',
        data() {
            return {
                list: [],
                totalPage: 0,
                pageIndex: 0,
                pageSize: 10
            }
        },
        methods: {
            onEdit() {
                this.$router.push({
                    name: 'userEdit'
                })

            },
            fetchList() {
                post('api/user/list', {
                    pageIndex: this.pageIndex, pageSize: this.pageSize
                }).then(response => {
                    let resData = response.data;
                    console.log(resData);
                    this.list = resData.content;
                    if (resData.hasOwnProperty('totalPages')) {
                        this.totalPage = resData.totalPages;
                    }

                    console.log(this.list);
                }).catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="stylus">
</style>
