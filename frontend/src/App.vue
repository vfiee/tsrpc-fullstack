<template>
  <div class="App">
    <h1>TSRPC Guestbook</h1>

    <div @click="createUser">创建用户</div>
  </div>
</template>

<script lang="ts">
import { ApiReturn } from 'tsrpc-proto'
import { defineComponent } from 'vue'
import { client } from './client'
import {
  ResCreateUser,
  ReqCreateUser
} from './shared/protocols/user/PtlCreateUser'

export default defineComponent({
  name: 'App',
  data() {
    return {}
  },

  methods: {
    async createUser() {
      const req: ReqCreateUser = {
        name: '姜威朋',
        nickname: 'vyron',
        password: '123456',
        avatar: '',
        sex: 0,
        phone: '1551615032'
      }
      const res: ApiReturn<ResCreateUser> = await client.callApi(
        'user/CreateUser',
        req
      )
      console.log(`res:`, res)
    },
    async loadList() {
      // let ret = await client.callApi("GetData", {});
      // // Error
      // if (!ret.isSucc) {
      //   alert(ret.err.message);
      //   return;
      // }
      // // Success
      // this.list = ret.res.data;
    },

    async send() {
      // let ret = await client.callApi("AddData", {
      //   content: this.input,
      // });
      // // Error
      // if (!ret.isSucc) {
      //   alert(ret.err.message);
      //   return;
      // }
      // // Success
      // this.input = "";
      // this.loadList();
    }
  },

  mounted() {
    this.loadList()
  }
})
</script>

<style lang="less">
@import './App.less';
</style>
