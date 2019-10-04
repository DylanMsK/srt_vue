<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        label="휴대폰 번호로 검색"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="tickets"
        disable-sort
        disable-filtering
        dark
      >
        <template v-slot:top>
            <v-dialog v-model="dialog" max-width="300px">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedTicket.srtid" label="SrtId" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.dpt" label="출발역" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.arr" label="도착역" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.adult" label="어른" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.child" label="아이" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.date" label="날짜" readonly></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4">
                        <v-text-field v-model="editedTicket.dptime" label="출발시간" readonly></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="editedTicket.status" label="status" readonly></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="editedTicket.lambda_status" label="lambda" readonly></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="editedTicket.is_complete" label="is_complete" readonly></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">뒤로</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            small
            class="mr-3"
            color="success"
            @click="editTicket(item)"
          >
            자세히
          </v-btn>
          <v-btn
            v-if="item.is_complete && !item.status"
            small
            disabled
          >
            성공
          </v-btn>
          <v-btn
            v-if="!item.is_complete && item.status"
            small
            class="mr-3"
            color="#9C27B0"
            @click="forceQuitTicketing(item)"
          >
            강제완료
          </v-btn>
          <v-btn
            v-if="!item.is_complete && item.status"
            small
            color="#FF9800"
            @click="pauseTicketing(item)"
          >
            일시중지
          </v-btn>
          <v-btn
            v-if="!item.is_complete && !item.status"
            small
            color="#8BC34A"
            @click="restartTicketing(item)"
          >
            재시작
          </v-btn>
          <v-btn
            v-if="item.is_complete && item.status"
            small
            color="#D50000"
          >
            에러!!
          </v-btn>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>

    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        { text: 'SrtId', align: 'left', value: 'srtid' },
        { text: '휴대폰번호', sortable: false, value: 'phone' },
        { text: '출발역', sortable: false, value: 'dpt' },
        { text: '도착역', sortable: false, value: 'arr' },
        { text: '날짜', sortable: false, value: 'date' },
        { text: '시간', sortable: false, value: 'dptime' },
        { text: 'Action', align: 'center', sortable: false, value: 'action' },
      ],
      editedIndex: -1,
      editedTicket: {
        srtid: '',
        dpt: 0,
        arr: 0,
        date: 0,
        dptime: 0,
      },
      defaultTicket: {
        srtid: '',
        dpt: 0,
        arr: 0,
        date: 0,
        dptime: 0,
      },
    }),

    computed: {
      tickets() {
        if (this.$store.getters['admin/getUserTickets']) {
          const ticketList = this.$store.getters['admin/getUserTickets']
          if (this.search.length > 0) {
            return ticketList.filter(ticket => {
              return ticket.phone.match(this.search)
            })
          } else {
            return ticketList
          }
        } else {
          return []
        }
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('admin/getUserTickets')
      },

      editTicket (item) {
        this.editedIndex = this.tickets.indexOf(item)
        this.editedTicket = Object.assign({}, item)
        this.dialog = true
      },

      forceQuitTicketing (item) {
        this.$store.dispatch('admin/editUserTicket', { id:item.id, status: false, is_complete: true })
      },

      pauseTicketing (item) {
        this.$store.dispatch('admin/editUserTicket', { id:item.id, status: false })
      },

      restartTicketing (item) {
        this.$store.dispatch('admin/editUserTicket', { id:item.id, status: true })
      },

      deleteTicket (item) {
        const index = this.tickets.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.tickets.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedTicket = Object.assign({}, this.defaultTicket)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.tickets[this.editedIndex], this.editedTicket)
        } else {
          this.tickets.push(this.editedTicket)
        }
        this.close()
      },
    },
  }
</script>
