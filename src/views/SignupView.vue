<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12 mt-12 mb-6 mt-sm-0" style="display:flex">
      <h2 class="signup-header mt-6">회원가입</h2>
    </v-col>

    <v-col class="justify-center col-12" style="display:flex">
      <SignupForm/>
    </v-col>
  </v-row>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue'

export default {
  components: {
    SignupForm
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style scoped>
</style>
