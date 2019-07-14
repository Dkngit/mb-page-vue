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
              <el-input v-model="obj.password" show-password></el-input>
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
  import axios from 'axios'

  let config = {
    url: 'http://localhost:8080/user',
    method: 'get',
    withCredentials: true,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // 'X-Requested-With': 'XMLHttpRequest',
      authorization: 'Basic ' + btoa('admin:admin')
    }
    // , auth: {username: 'admin', password: 'admin'}
  };

  // Alter defaults after instance has been created
  // http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

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
        axios.request(config).then(response => {
          console.log(response)
        }).catch(error => console.log(error))
      },
      onTest() {
        axios.get('http://localhost:8080/').then(response => {
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
