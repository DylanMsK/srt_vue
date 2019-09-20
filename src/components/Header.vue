<template>
  <v-app-bar app flat color="#fafafa" class="py-0 px-sm-12" style="display: contents;">
    <v-toolbar-title @click="goTo('home')">SRTicket</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-show="isAuthenticated">
      <!-- <v-btn text @click="goTo('admin')">관리자</v-btn>
      <v-btn text @click="checkUser">체크유저</v-btn> -->
      <v-btn text @click="signout">로그아웃</v-btn>
    </v-toolbar-items>

  </v-app-bar>
</template>


<script>
/* eslint-disable */
import router from '@/router'

export default {
  name: "Header",
  methods: {
    goTo(pathName) {
      // eslint-disable-next-line
      router.push({name: pathName}).catch(err => {})
    },
    signout() {
      this.$store.dispatch('userLogout')
    },
    checkUser() {
      console.log(this.$store.getters.getUser)
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<style scoped>
.home {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87)
}
</style>
