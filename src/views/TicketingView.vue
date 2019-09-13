<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12 mt-12 mb-6 mt-sm-0" style="display:flex">
      <h2>새로운 예매</h2>
    </v-col>

    <v-col class="justify-center col-12" style="display:flex">
      <TicketingForm/>
    </v-col>
  </v-row>
</template>

<script>
import TicketingForm from '@/components/TicketingForm.vue'

export default {
  components: {
    TicketingForm
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style scoped>
</style>
