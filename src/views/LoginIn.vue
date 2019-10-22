<template>
  <div>
    <el-container>
      <el-main>
        <el-button @click="onTest">resource</el-button>
        <el-button @click="onLogout">logout</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import http from '@/utils/http'

    export default {
        name: 'loginIn',
        components: {},
        data() {
            return {
                obj: {username: 'admin', password: 'admin'}
            }
        },
        methods: {
            onTest() {
                http.get('/resource').then(response => {
                    console.log(response)
                })
            },
            onLogout() {
                http.post('/logout').then(response => {
                    console.log(response)
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .form
    width 50%
    margin auto
</style>
