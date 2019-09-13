<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12" style="display:flex">
      <LoginForm></LoginForm>
    </v-col>
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
  }
};
</script>

<style scoped>
</style>
