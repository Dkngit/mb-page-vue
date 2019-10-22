<template>
    <el-container>
        <el-header><span @click="showOwn()">Header</span>{{loginInfo.name}}</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-main>Main</el-main>
                <!--        <el-footer>Footer</el-footer>-->
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'home',
        computed: {
            ...mapState(["loginInfo"])
        },
        methods: {
            showOwn() {
                console.log(this.loginInfo);
            }
        }
    }
</script>
