<template>
    <div class="div-root">
        <el-table v-loading="loading"
                  :data="list"
                  style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :total="50">
        </el-pagination>
    </div>
</template>

<script>


    import {post} from "@/utils/http";
    import {teamsList} from "@/utils/api";

    export default {
        name: "Teams",
        data() {
            return {
                list: null,
                loading: false,
                pageIndex: 0,
                pageSize: 10
            }
        },
        methods: {
            onLoad() {
                if (!this.loading) {
                    this.loading = true;
                    post(teamsList, {
                        pageIndex: this.pageIndex, pageSize: this.pageSize
                    }).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    }).finally(() => this.loading = false)
                }
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