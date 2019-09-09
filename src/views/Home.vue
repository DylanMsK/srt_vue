<template>
  <v-row no-gutters>
    <template v-if="!isAuthenticated">
      <v-col class="justify-center col-12" style="display:flex">
        <LoginForm></LoginForm>
      </v-col>
    </template>

    <template v-else>
      <v-col class="justify-center col-12" style="display:flex">
        <v-btn class="new-book" color="#4a2b46" large @click="goTo('reserve')">새로운 예약</v-btn>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    LoginForm
  },
  methods: {
    goTo(pathName) {
      this.$router.push({name: pathName})
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
};
</script>

<style scoped>
.new-book {
  width: 60%;
  color: #fafafa !important;
  font-weight: bold !important;
  font-size: 1rem !important;
}
</style>
