<template>
  <div>
    <el-container>
      <el-main>
        <div class="form">
          <el-form ref="form" :model="obj">
            <el-form-item label="用户名">
              <el-input v-model="obj.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="obj.password" show-password=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button @click="onTest">忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    import http from '@/axiosWrap'

    export default {
        name: 'login',
        components: {},
        data() {
            return {
                obj: {username: 'admin', password: 'admin'}
            }
        },
        methods: {
            onSubmit() {
                http.get('/user', {
                    auth: {username: this.obj.username, password: this.obj.password}
                }).then(response => {
                    console.log(response)
                }).catch(error => console.log(error))
            },
            onTest() {
                http.get('/resource').then(response => {
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
