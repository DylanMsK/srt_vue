<template>
  <v-row no-gutters>
    <v-col class="col-12 mb-12">
      <h3>남은 포인트</h3>
      <hr class="mt-2">
      <div class="px-5 mt-2" style="text-align: right;">
        <span style="font-size: 2rem;">{{getUserPoint}}P</span>
      </div>
    </v-col>
    <v-col class="justify-center col-12 mt-12 mb-12" style="display:flex">
      <v-btn class="new-book" color="#4a2b46" large @click="goTo('reserve')">새로운 예약</v-btn>
    </v-col>
    <v-col class="col-12 mt-12">
      <h3>진행중인 예약</h3>
      <hr class="mt-2">
      <TicketList
        class="mt-2"
        v-if="uncompletedTicketList.length > 0"
        :ticketList="uncompletedTicketList"
      />
      <p class="text-center mt-3" v-else>
        진행중인 예약이 없습니다.
      </p>
    </v-col>
    <v-col class="col-12 mt-12">
      <h3>완료된 예약</h3>
      <hr class="mt-2">
      <TicketList
        class="mt-2"
        v-if="completedTicketList.length > 0"
        :ticketList="completedTicketList"
      />
      <p class="text-center mt-3" v-else>
        완료된 예약이 없습니다.
      </p>
    </v-col>
  </v-row>
</template>

<script>
import TicketList from '@/components/TicketList'

export default {
  components: {
    TicketList,
  },
  data() {
    return {
      point: 0,
    }
  },
  methods: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    goTo(pathName) {
      this.$router.push({name: pathName})
    },
    initializeData() {
      this.$store.dispatch('user/userTickets')
    },
  },
  computed: {
    getUserPoint() {
      if (this.$store.getters['auth/getUser']) {
        return this.$store.getters['auth/getUser'].point
      } else {
        return 0
      }
    },
    uncompletedTicketList() {
      if (this.$store.getters['user/getUncompletedTicketList']) {
        return this.$store.getters['user/getUncompletedTicketList']
      }
      return []
    },
    completedTicketList() {
      if (this.$store.getters['user/getCompletedTicketList']) {
        return this.$store.getters['user/getCompletedTicketList']
      }
      return []
    }
  },
  async created() {
    await this.initializeData()
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
