<template>
  <v-row no-gutters>
    <v-col class="col-12 mt-6 mt-sm-0" style="display:flex">
      <span class="sub-header">탑승날짜</span>
      <span class="content">{{ticketInfo.formatedDate}}</span>
    </v-col>

    <v-col class="col-6 mt-6">
      <span class="sub-header">출발역</span>
      <span class="content">{{ticketInfo.dpt}}역</span>
    </v-col>
    <v-col class="col-6 mt-6">
      <span class="sub-header">도착역</span>
      <span class="content">{{ticketInfo.arr}}역</span>
    </v-col>

    <v-col class="col-6 mt-6">
      <span class="sub-header">어른</span>
      <span class="content">{{ticketInfo.adult}} 명</span>
    </v-col>
    <v-col class="col-6 mt-6">
      <span class="sub-header">아이</span>
      <span class="content">{{ticketInfo.child}} 명</span>
    </v-col>

    <v-col class="col-12 mt-6 mb-1">
      <span class="sub-header">탑승희망시간</span>
    </v-col>
    <v-col class="col-12 mt-1">
      <table class="table">
        <tr>
          <th>No.</th><th>출발시간</th><th>도착시간</th>
        </tr>
        <tr v-for="(time, no) in ticketInfo.selectedTimes" :key="time.ticketNum">
          <td>{{no+1}}</td><td>{{time.departTime}}</td><td>{{time.arriveTime}}</td>
        </tr>
      </table>  
    </v-col>

    <v-col class="col-12 mt-6">
      <span>위 정보와 같이 예매를 진행합니다.</span>
    </v-col>

    <v-col class="col-auto mt-6">
      <v-btn class="edit-btn" color="#03A9F4" @click="$router.go(-1)" large>수정</v-btn>
    </v-col>
    <v-spacer></v-spacer>
    <v-col class="col-auto mt-6">
      <v-btn class="submit-btn" color="#4a2b46" large @click="submitForm">확인</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    dpt: {
      type: String,
    },
    arr: {
      type: String,
    },
    adult: {
      type: String,
    },
    child: {
      type: String,
    },
    date: {
      type: String,
    },
    dptime: {
      type: String,
    },
    selectedTimes: {
      type: Array,
    },
    phone: {
      type: String,
    },
  },
  data() {
    return {
      ticketInfo: {
        dpt: this.dpt,
        arr: this.arr,
        adult: this.adult,
        child: this.child,
        date: this.date,
        dptime: this.dptime,
        selectedTimes: this.selectedTimes,
        phone: this.phone
      }
    }
  },
  methods: {
    setTicketInfo() {
      localStorage.setItem('ticketInfo', JSON.stringify(this.ticketInfo))
    },
    getTicketInfo() {
      this.ticketInfo = JSON.parse(localStorage.getItem('ticketInfo'))
    },
    submitForm() {
      const profile = this.$store.getters.getUser
      const tickets = this.ticketInfo.selectedTimes.map(ticket => {
        return ticket.ticketNumber
      })
      this.$store.dispatch('submitForm', {
        srtid: profile.srtId,
        srtpw: profile.srtPassword,
        logintype: profile.loginType,
        dpt: this.ticketInfo.dpt,
        arr: this.ticketInfo.arr,
        adult: this.ticketInfo.adult,
        child: this.ticketInfo.child,
        date: this.ticketInfo.date,
        dptime: this.ticketInfo.dptime,
        ticketnum: tickets.join(','),
        phone: this.ticketInfo.phone
      })
    }
  },
  computed: {
    formatedDate() {
      const [year, month, day] = this.date.split('-')
      return `${year} 년  ${month} 월  ${day} 일`
    },
  },
  created() {
    if ('ticketInfo' in localStorage) {
      this.getTicketInfo()
    } else {
      this.setTicketInfo()
    }
  },
  beforeDestroy() {
    localStorage.removeItem('ticketInfo')
  }
};
</script>

<style scoped>
.sub-header {
  font-weight: bold;
  font-size: 1.1rem;
  color: #3c3c3c;
  margin-right: 1rem;
}
.table {
  border-collapse: collapse;
  border-top: 3px solid #168;
  width: 100%;
}  
.table th {
  color: #168;
  background: #f0f6f9;
  text-align: center;
}
.table th, .table td {
  padding: 10px;
  border: 1px solid #ddd;
}
.table th:first-child, .table td:first-child {
  border-left: 0;
}
.table th:last-child, .table td:last-child {
  border-right: 0;
}
.table tr td {
  text-align: center;
}
.edit-btn {
  font-weight: bold !important;
  font-size: 1rem !important;
}
.submit-btn {
  color: #fafafa !important;
  font-weight: bold !important;
  font-size: 1rem !important;
}
</style>
