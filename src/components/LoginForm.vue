<template>
  <v-form class="login-form" lazy-validation>
    <v-radio-group v-model="loginType" hide-details row>
      <v-radio label="멤버쉽" value="membership" input-value="true"></v-radio>
      <v-radio label="휴대폰번호" value="phone"></v-radio>
      <v-radio label="이메일" value="email"></v-radio>
    </v-radio-group>

    <v-text-field
      v-if="loginType === 'membership'"
      class="mt-4"
      v-model="membership"
      :error-messages="membershipErrors"
      @input="$v.membership.$touch()"
      @blur="$v.membership.$touch()"
      label="멤버쉽번호"
    ></v-text-field>
    <v-text-field
      v-else-if="loginType === 'phone'"
      class="mt-4"
      v-model="phone"
      :error-messages="phoneErrors"
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
      label="휴대폰번호"
    ></v-text-field>
    <v-text-field
      v-else
      class="mt-4"
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      label="이메일"
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="password"
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      label="비밀번호"
      type="password"
      @keyup.enter="userLogin"
      required
    ></v-text-field>

    <v-container class="mt-6">
      <v-row>
        <v-btn class="login-btn" color="#4a2b46" large @click="userLogin">로그인</v-btn>
      </v-row>
      <v-row>
        <!-- <v-col class="px-0 col-4 mt-0">
          <v-btn text class="signup-btn" @click="checkUser">유저확인</v-btn>
        </v-col> -->
        <v-spacer></v-spacer>
        <v-col class="px-0 col-4 mt-0">
          <v-btn text class="signup-btn" @click="goTo('signup')">회원가입</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredUnless, minLength, maxLength, numeric, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  data() {
    return {
      loginType: 'membership',
      membership: '',
      phone: '',
      email: '',
      password: '',
    };
  },
  mixins: [validationMixin],
  validations: {
    membership: {
      requiredUnless: requiredUnless('selectLoginType'),
      numeric,
      minLength: minLength(9),
      maxLength: maxLength(11)
    },
    phone: {
      requiredUnless: requiredUnless('selectLoginType'),
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(11)
    },
    email: {
      requiredUnless: requiredUnless('selectLoginType'),
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    goTo(pathName) {
      this.$router.push({name: pathName})
    },
    clear() {
      this.$v.$reset()
      this.membership = '';
      this.phone = '';
      this.email = '';
      this.password = '';
    },
    userLogin() {
      this.$v.$touch()
      if (this.$v.invalid) {
        console.log('Validation Error!!')
        } else {
          let srtId = ''
          if (this.loginType === 'membership') {
            srtId = this.membership
          } else if (this.loginType === 'phone') {
            srtId = this.phone
          } else {
            srtId = this.email
          }
          this.$store.dispatch('userLogin', {
            username: srtId,
            password: this.password
          })
          this.clear()
      }
    },
  },
  computed: {
    selectLoginType() {
      return !!this.phone || !!this.email || !!this.membership
    },
    membershipErrors() {
      const errors = []
      if (!this.$v.membership.$dirty) {
        return errors
      }
      !this.$v.membership.requiredUnless && errors.push('멤버쉽번호를 입력해 주세요.')
      !this.$v.membership.numeric && errors.push('멤버쉽번호는 숫자만 입력해 주세요.')
      !this.$v.membership.minLength && errors.push('멤버쉽번호는 9~11자리만 입력 가능합니다.')
      !this.$v.membership.maxLength && errors.push('멤버쉽번호는 9~11자리만 입력 가능합니다.')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) {
        return errors
      }
      !this.$v.phone.requiredUnless && errors.push('휴대폰번호를 입력해 주세요.')
      !this.$v.phone.numeric && errors.push('휴대폰번호는 숫자만 입력해 주세요.')
      !this.$v.phone.minLength && errors.push('휴대폰번호는 10~11자리만 입력 가능합니다.')
      !this.$v.phone.maxLength && errors.push('휴대폰번호는 10~11자리만 입력 가능합니다.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.requiredUnless && errors.push('이메일주소를 입력해 주세요.')
      !this.$v.email.email && errors.push('유효하지 않은 이메일주소입니다.')
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
    }
  },
 }
</script>

<style scoped>
.login-form {
  width: 100%;
}
.login-btn {
  width: 100%;
  color: #fafafa !important;
  font-weight: bold !important;
  font-size: 1rem !important;
}
.signup-btn {
  width: 100%;
}
</style>
