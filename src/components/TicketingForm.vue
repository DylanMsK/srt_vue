<template>
  <v-form lazy-validation>
    <v-container fluid>
      <v-row>
        <v-text-field
          class="mt-4"
          v-model="phone"
          :error-messages="phoneErrors"
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
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
            :error-messages="departErrors"
            @input="$v.depart.$touch()"
            @blur="$v.depart.$touch()"
            label="출발역"
          ></v-select>
        </v-col>
        <v-col class="pr-0">
          <v-select
            v-model="arrive"
            :items="stations"
            :error-messages="arriveErrors"
            @input="$v.arrive.$touch()"
            @blur="$v.arrive.$touch()"
            label="도착역"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pl-0">
          <v-select
            v-model="adult"
            :items="numbers"
            :error-messages="adultErrors"
            @input="$v.adult.$touch()"
            @blur="$v.adult.$touch()"
            label="어른"
            required
          ></v-select>
        </v-col>
        <v-col class="pr-0">
          <v-select
            v-model="child"
            :items="numbers"
            :error-messages="childErrors"
            @input="$v.child.$touch()"
            @blur="$v.child.$touch()"
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
                v-model="date"
                label="출발일"
                @blur="date = parseDate(formatDate(date))"
                v-on="on"
                required
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="dateMenu = false" required></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pl-0 pb-0 col-7">
          <v-select
            v-model="time"
            :items="timeList"
            :error-messages="timeErrors"
            @input="$v.time.$touch()"
            @blur="$v.time.$touch()"
            label="탑승시간"
            required
          ></v-select>
        </v-col>
        <v-col class="pr-0 pb-0 col-5 justify" align-self="center">
          <v-dialog v-model="dialog" scrollable width="100%" max-width="300px">
            <template v-slot:activator="{ on }">
              <v-btn class="primary" width="100%" v-on="on" :disabled="!time">상세 시간 선택</v-btn>
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
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">다음</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="px-0 pt-0 col-12">
          <small>선택한 시간 이후의 기차표를 예매합니다.</small>
        </v-col>
      </v-row>

      <v-row justify="start">
      </v-row>

      <v-row>
        <v-btn class="next-btn" color="#4a2b46" :disabled="!checkSubmit" large @click="checkReserve">예약신청하기</v-btn>
      </v-row>

    </v-container>
  </v-form>
</template>

<script>
import api from '@/api'
import { validationMixin } from 'vuelidate'
import { required, numeric, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'TicketingForm',
  data() {
    return {
      userInfo: null,
      stations: ['수서', '동탄', '지제', '천안안산', '오송', '대전', '김천(구미)',
                   '동대구', '신경주', '울산(통도사)', '부산', '공주', '익산',
                   '정읍', '광주송정', '나주', '목포'],
      numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
      timeList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13',
                 '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
      user: {},
      phone: '',
      depart: '',
      arrive: '',
      adult: '',
      child: '',
      date: new Date().toISOString().substr(0, 10),
      // dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      time: '',
      dialog: false,
      selectedTimes: [],
    };
  },
  mixins: [validationMixin],
  validations: {
    phone: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(11)
    },
    depart: {
      required,
    },
    arrive: {
      required,
      sameAs: sameAs('depart')
    },
    adult: {
      required
    },
    child: {
      required
    },
    time: {
      required
    }
  },
  methods: {
    checkReserve() {
      const profile = this.$store.getters.getUser
      this.$router.push({name: 'checkReserve', params: {
        dpt: this.depart,
        arr: this.arrive,
        adult: this.adult,
        child: this.child,
        date: this.date,
        dptime: this.time,
        selectedTimes: this.selectedTimes,
        phone: profile.phone
      }})
    },
    initializeData() {
      this.user = this.$store.getters.getUser
      this.phone = this.user.phone
    },
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

      }
    },
  },
  computed: {
    checkSubmit() {
      return !!this.phone && !!this.depart && !!this.arrive && !!this.adult &&
             !!this.child && !!this.date && !!this.time && this.selectedTimes.length > 0
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) {
        return errors
      }
      !this.$v.phone.required && errors.push('예매 완료후 연락받을 휴대폰번호를 입력해 주세요.')
      !this.$v.phone.numeric && errors.push('휴대폰번호는 숫자만 입력해 주세요.')
      !this.$v.phone.minLength && errors.push('휴대폰번호는 10~11자리만 입력 가능합니다.')
      !this.$v.phone.maxLength && errors.push('휴대폰번호는 10~11자리만 입력 가능합니다.')
      return errors
    },
    departErrors() {
      const errors = []
      if (!this.$v.depart.$dirty) return errors
      !this.$v.depart.required && errors.push('출발역을 선택해해주세요.')
      return errors
    },
    arriveErrors() {
      const errors = []
      if (!this.$v.arrive.$dirty) return errors
      !this.$v.arrive.required && errors.push('도착역을 선택해주세요.')
      this.$v.arrive.sameAs && errors.push('도착역이 출발역과 같습니다.')
      return errors
    },
    adultErrors() {
      const errors = []
      if (!this.$v.adult.$dirty) return errors
      !this.$v.adult.required && errors.push('인원을 선택해 주세요.')
      return errors
    },
    childErrors() {
      const errors = []
      if (!this.$v.child.$dirty) return errors
      !this.$v.child.required && errors.push('인원을 선택해 주세요.')
      return errors
    },
    timeErrors() {
      const errors = []
      if (!this.$v.time.$dirty) return errors
      !this.$v.time.required && errors.push('탑승시간을 선택해 주세요.')
      return errors
    }
  },
  watch: {
    time() {
      const formattedDate = this.date.replace('-', '')
      api.getSchedules(this.depart, this.arrive, formattedDate, this.time).then(res => {
        this.tickets = res.data
      }
      )
    }
  },
  created() {
    this.initializeData()
  },
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