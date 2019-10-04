<template>
  <v-row no-gutters>
    <v-col class="col-12 mt-6 mb-2">
      <v-row justify="center">
        <v-btn-toggle v-model="selected" mandatory>
          <v-btn value="profiles" text style="width: 100px;">Users</v-btn>
          <v-btn value="tickets" text style="width: 100px;">Tickets</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-col>

    <v-col class="col-12 mb-12">
      <AdminTicketsTable
        v-if="selected === 'tickets'"
      />
      <AdminProfilesTable
        v-else-if="selected === 'profiles'"
      />
    </v-col>
  </v-row>
</template>

<script>
  import AdminTicketsTable from '@/components/AdminTicketsTable'
  import AdminProfilesTable from '@/components/AdminProfilesTable'

  export default {
    components: {
      AdminTicketsTable,
      AdminProfilesTable
    },
    data() {
      return {
        selected: 'profiles'
      }
    },
    methods: {
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
