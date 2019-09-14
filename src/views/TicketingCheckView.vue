<template>
  <v-row no-gutters>
    <v-col class="col-12 mt-12 mt-sm-0" style="display:flex">
      <span class="sub-header">탑승날짜</span>
      <span class="content">{{formatedDate}}</span>
    </v-col>

    <v-col class="col-6 mt-6">
      <span class="sub-header">출발역</span>
      <span class="content">{{dpt}}역</span>
    </v-col>
    <v-col class="col-6 mt-6">
      <span class="sub-header">도착역</span>
      <span class="content">{{arr}}역</span>
    </v-col>

    <v-col class="col-6 mt-6">
      <span class="sub-header">어른</span>
      <span class="content">{{adult}} 명</span>
    </v-col>
    <v-col class="col-6 mt-6">
      <span class="sub-header">아이</span>
      <span class="content">{{child}} 명</span>
    </v-col>

    <v-col class="col-12 mt-6 mb-1">
      <span class="sub-header">탑승희망시간</span>
    </v-col>
    <v-col class="col-12 mt-1">
      <table class="table">
        <tr>
          <th>No.</th><th>출발시간</th><th>도착시간</th>
        </tr>
        <tr v-for="(time, no) in selectedTimes" :key="time.ticketNum">
          <td>{{no+1}}</td><td>{{time.departTime}}</td><td>{{time.arriveTime}}</td>
        </tr>
      </table>  
    </v-col>

    <v-col class="col-12 mt-6">
      <span>위 정보와 같이 예매를 진행합니다.</span>
    </v-col>

    <v-col class="col-auto mt-6">
      <v-btn class="edit-btn" color="#03A9F4" large>수정</v-btn>
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
      required: true
    },
    arr: {
      type: String,
      required: true
    },
    adult: {
      type: String,
      required: true
    },
    child: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    dptime: {
      type: String,
      required: true
    },
    selectedTimes: {
      type: Array,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
  },
  components: {
    
  },
  methods: {
    submitForm() {
      const profile = this.$store.getters.getUser
      const tickets = this.selectedTimes.map(ticket => {
        return ticket.ticketNumber
      })
      console.log({
        srtId: profile.srtId,
        srtPw: profile.srtPassword,
        logintype: profile.loginType,
        dpt: this.dpt,
        arr: this.arr,
        adult: this.adult,
        child: this.child,
        date: this.date,
        dptime: this.dptime,
        ticketnum: tickets,
        phone: this.phone
      })
      this.$store.dispatch('submitForm', {
        srtId: profile.srtId,
        srtPw: profile.srtPassword,
        logintype: profile.loginType,
        dpt: this.dpt,
        arr: this.arr,
        adult: this.adult,
        child: this.child,
        date: this.date,
        dptime: this.dptime,
        ticketnum: tickets,
        phone: this.phone
      })
    }
  },
  computed: {
    formatedDate() {
      const [year, month, day] = this.date.split('-')
      return `${year} 년  ${month} 월  ${day} 일`
    }
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
