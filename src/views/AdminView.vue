<template>
  <v-row no-gutters>
    <v-col class="col-12 mb-12 my-6">
      <v-row align="center" justify="center">
        <v-btn-toggle v-model="selected" mandatory>
          <v-btn value="users" text style="width: 100px;">Users</v-btn>
          <v-btn value="tickets" text style="width: 100px;">Tickets</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-col>

    <v-col class="col-12 mb-12">
      <AdminTicketsTable/>
    </v-col>
  </v-row>
</template>

<script>
  import AdminTicketsTable from '@/components/AdminTicketsTable'

  export default {
    components: {
      AdminTicketsTable
    },
    data() {
      return {
        selected: 'tickets'
      }
    },
    methods: {
      checked() {
        console.log(this.selected)
      },
      checkRole() {
        const role = this.$store.getters['auth/getRole']
        if (role !== 'admin') {
          location="/"
        }
      }
    },
    created () {
      this.checkRole()
    },
  }
</script>
