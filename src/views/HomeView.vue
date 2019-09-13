<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12" style="display:flex">
      <v-btn class="new-book" color="#4a2b46" large @click="goTo('reserve')">새로운 예약</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    goTo(pathName) {
      this.$router.push({name: pathName})
    }
  },
  computed: {
  },
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
