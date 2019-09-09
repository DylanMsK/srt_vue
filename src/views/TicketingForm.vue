<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12 mt-12 mb-6 mt-sm-0" style="display:flex">
      <h2>새로운 예매</h2>
    </v-col>

    <v-col class="justify-center col-12" style="display:flex">
      <v-form style="width: 100%;">
        <v-container fluid>
          <v-row>
            <v-text-field
              class="mt-4"
              v-model="phone"
              label="휴대폰번호"
              hint="예매 완료시 위 번호로 연락드립니다."
              persistent-hint
              required
            ></v-text-field>
          </v-row>

          <v-row>
            <v-col class="pl-0">
              <v-select
                v-model="depart"
                :items="stations"
                label="출발역"
                required
              ></v-select>
            </v-col>
            <v-col class="pr-0">
              <v-select
                v-model="arrive"
                :items="stations"
                label="도착역"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="pl-0">
              <v-select
                v-model="adult"
                :items="numbers"
                label="어른"
                required
              ></v-select>
            </v-col>
            <v-col class="pr-0">
              <v-select
                v-model="child"
                :items="numbers"
                label="아이"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="px-0">
              <v-menu
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="출발일"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="dateMenu = false" required></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="px-0">
              <v-select
                v-model="time"
                :items="times"
                label="탑승시간"
                hint="선택한 시간 이후의 기차표를 예매합니다."
                persistent-hint
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row justify="start">
            <v-dialog v-model="dialog" scrollable width="100%" max-width="300px">
              <template v-slot:activator="{ on }">
                <v-btn class="mt-3 primary" v-on="on">예매 가능한 시간 선택</v-btn>
              </template>
              <v-card>
                <v-card-title>탑승 희망 시간</v-card-title>
                <v-divider></v-divider>

                <v-data-table
                  v-model="selectedTimes"
                  :headers="headers"
                  :items="tickets"
                  :mobile-breakpoint = "300"
                  item-key="ticketNumber"
                  show-select
                  hide-default-footer
                />

                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row>
            <v-btn class="next-btn mt-12" color="#4a2b46" large @click="createReservation">예약신청하기</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

import { validationMixin } from 'vuelidate'
// import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'TicketingForm',
  data() {
    return {
      userInfo: null,
      stations: ['수서', '동탄', '지제', '천안안산', '오송', '대전', '김천(구미)',
                   '동대구', '신경주', '울산(통도사)', '부산', '공주', '익산',
                   '정읍', '광주송정', '나주', '목포'],
      numbers: [0, 1, 2, 3, 4, 5, 5, 6, 7, 8],
      times: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
              '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      headers: [
        {
          text: '출발시간',
          align: 'center',
          sortable: false,
          value: 'departTime',
          width: "40%"
        },
        { 
          text: '도착시간',
          align: 'center',
          sortable: false,
          value: 'arriveTime',
          width: "40%"
        },
      ],
      tickets: [
        {
          departTime: '11:20',
          arriveTime: '15:34',
          ticketNumber: 1
        },
        {
          departTime: '11:40',
          arriveTime: '15:54',
          ticketNumber: 2
        },
        {
          departTime: '12:01',
          arriveTime: '15:59',
          ticketNumber: 3
        },
        {
          departTime: '12:49',
          arriveTime: '16:44',
          ticketNumber: 4
        },
        {
          departTime: '13:14',
          arriveTime: '16:54',
          ticketNumber: 5
        },
        {
          departTime: '13:46',
          arriveTime: '17:04',
          ticketNumber: 6
        },
        {
          departTime: '14:03',
          arriveTime: '17:33',
          ticketNumber: 7
        },
        {
          departTime: '14:21',
          arriveTime: '18:02',
          ticketNumber: 8
        },
      ],
      dateMenu: false,
      timeMenu: false,
      phone: '',
      depart: '',
      arrive: '',
      adult: 0,
      child: 0,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      time: new Date().toISOString().substr(11, 13),
      dialog: false,
      selectedTimes: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  mixins: [validationMixin],
  validations: {
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    reFormatDate(date) {
      const [month, day, year] = date.split('/')
      return new Date(year, month, day)
    },
    clear() {
      this.$v.$reset()
    },
    closeSignupModal() {
      this.dialog = !this.dialog;
      this.$refs.signup.clear();
    },
    createReservation() {
      this.$v.$touch()
      if (this.$v.invalid) {
        console.log('Validation Error!!')
        } else {
          console.log(this.userInfo)
          const tickets = this.selectedTimes.map(ticket => {
            return ticket.ticketNumber
          })
          this.$store.dispatch('createReservation', {
            id: this.userInfo.id,
            password: this.userInfo.password,
            uid: this.userInfo.uid,
            depart: this.depart,
            arrive: this.arrive,
            adult: this.adult,
            child: this.child,
            date: this.date,
            tickets: tickets
          })
          this.clear()
      }
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.required && errors.push('이메일 주소를 확인해 주세요.')
      !this.$v.email.email && errors.push('유효하지 않은 이메일주소입니다')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('비밀번호를 입력해주세요')
      !this.$v.password.minLength && errors.push('최소 6자리 이상 입력해 주세요')
      return errors
    },
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push({name: 'home'})
    } else {
      firebase.firestore().collection('users').doc(this.$store.state.user.uid).get().then(doc => {
        const data = doc.data()
        data.uid = doc.id
        this.userInfo = data
        this.phone = data.phone
      })
    }
  }
}
</script>

<style scoped>
.next-btn {
  width: 100%;
  color: #fafafa !important;
  font-weight: bold !important;
  font-size: 1rem !important;
}
</style>