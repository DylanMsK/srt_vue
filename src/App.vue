<template>
  <v-app style="background-color: #fafafa">
    <Header></Header>
    <v-container fluid fill-height class="main-content px-5">
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.main-content {
  max-width: 840px !important;
}
</style>