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
        :items="profiles"
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
                        <v-text-field v-model="editedProfile.srtId" label="SrtId" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedProfile.srtPassword" label="SrtPassword" readonly></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedProfile.phone" label="휴대폰번호"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedProfile.point" label="포인트"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                  <v-btn color="blue darken-1" text @click="save">저장</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            small
            class="mr-5"
            color="primary"
            @click="editProfile(item)"
          >
            수정
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
        { text: 'SrtId', align: 'left', value: 'srtId' },
        { text: '로그인유형', value: 'loginType' },
        { text: '휴대폰번호', sortable: false, value: 'phone' },
        { text: '포인트', sortable: false, value: 'point' },
        { text: 'Action', align: 'center', sortable: false, value: 'action' },
      ],
      editedProfile: {
        srtId: '',
        srtPassword: '',
        loginType: 3,
        phone: '',
        point: 0,
      },
      defaultProfile: {
        srtId: '',
        srtPassword: '',
        loginType: 3,
        phone: '',
        point: 0,
      },
    }),

    computed: {
      profiles() {
        if (this.$store.getters['admin/getUserProfiles']) {
          const profileList = this.$store.getters['admin/getUserProfiles']
          if (this.search.length > 0) {
            return profileList.filter(profile => {
              return profile.phone.match(this.search)
            })
          } else {
            return profileList
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
        this.$store.dispatch('admin/getUserProfiles')
      },

      editProfile (item) {
        this.editedProfile = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.editedProfile = Object.assign({}, this.defaultProfile)
      },

      save () {
        this.$store.dispatch('admin/editUserProfile', this.editedProfile)
        this.close()
      },
    },
  }
</script>
