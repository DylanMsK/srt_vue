<template>
  <v-row no-gutters>
    <v-col class="justify-center col-12" style="display:flex">
      <v-form lazy-validation class="mt-12">
        <small>SRT사이트에서 사용하는 아이디/비밀번호와 동일하게 가입해주세요.</small>
        <v-radio-group class="mt-12" v-model="loginType" hide-details row>
          <v-radio label="휴대폰" value="3" input-value="true"></v-radio>
          <v-radio label="이메일" value="2"></v-radio>
          <v-radio label="멤버쉽" value="1"></v-radio>
        </v-radio-group>
        <v-text-field
          v-if="loginType === '3'"
          class="mt-4"
          v-model="phone"
          :error-messages="phoneErrors"
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
          label="휴대폰번호"
          required
        ></v-text-field>
        <v-text-field
          v-else-if="loginType === '2'"
          class="mt-4"
          v-model="email"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          label="이메일"
          required
        ></v-text-field>
        <v-text-field
          v-else
          class="mt-4"
          v-model="membership"
          :error-messages="membershipErrors"
          @input="$v.membership.$touch()"
          @blur="$v.membership.$touch()"
          label="멤버쉽번호"
          required
        ></v-text-field>

        <v-text-field
          class="mt-4"
          v-model="password"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          label="비밀번호"
          @keyup.enter="userRegister"
          required
        ></v-text-field>

        <v-text-field
          class="mt-4"
          v-model="checkPassword"
          :error-messages="checkPasswordErrors"
          @input="$v.checkPassword.$touch()"
          @blur="$v.checkPassword.$touch()"
          label="비밀번호"
          @keyup.enter="userRegister"
          required
        ></v-text-field>

        <v-text-field
          v-if="loginType !== '3'"
          class="mt-4"
          v-model="phone"
          :error-messages="phoneErrors"
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
          label="휴대폰 번호"
          hint="예매 성공시 문자 발송을 위해 사용됩니다."
          persistent-hint
          @keyup.enter="userRegister"
          required
        ></v-text-field>

        <v-btn class="signup-btn mt-6" color="#4a2b46" large @click="userRegister">가입하기</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredUnless, minLength, maxLength, numeric, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'signupForm',
  mixins: [validationMixin],
  validations: {
    phone: {
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(11),
      requiredUnless: requiredUnless('selectLoginType') 
    },
    email: {
      email,
      requiredUnless: requiredUnless('selectLoginType') 
    },
    membership: {
      numeric,
      minLength: minLength(9),
      maxLength: maxLength(11),
      requiredUnless: requiredUnless('selectLoginType') 
    },
    password: {
      required,
      minLength: minLength(6)
    },
    checkPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  data() {
    return {
      loginType: '3',
      phone: '',
      email: '',
      membership: '',
      password: '',
      checkPassword: '',
    }
  },
  methods: {
    clear() {
      this.$v.$reset()
      this.loginType = '3'
      this.phone = ''
      this.email = ''
      this.membership = ''
      this.password = ''
      this.checkPassword = ''
    },
    userRegister() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('Validation Error!!')
        } else {
          let srtId = ''
          if (this.loginType === '1') {
            srtId = this.membership
          } else if (this.loginType === '3') {
            srtId = this.phone
          } else {
            srtId = this.email
          }
          this.$store.dispatch('auth/userRegister', {
            loginType: this.loginType,
            username: srtId,
            password: this.password,
            phone: this.phone
          })
        this.clear()
      }
    },
  },
  computed: {
    selectLoginType() {
      return !!this.phone || !!this.email || !!this.membership
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
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.required && errors.push('비밀번호를 입력해주세요')
      !this.$v.password.minLength && errors.push('최소 6자리 이상 입력해 주세요')
      return errors
    },
    checkPasswordErrors() {
      const errors = []
      if (!this.$v.checkPassword.$dirty) {
        return errors
      }
      !this.$v.checkPassword.required && errors.push('비밀번호를 한번 더 입력해 주세요')
      !this.$v.checkPassword.sameAs && errors.push('비밀번호가 일치하지 않습니다')
      return errors
    }
  }
}
</script>

<style>
small {
  font-weight: bold;
}
.signup-header {
  width: 100%;
  text-align: center;
}
.signup-btn {
  width: 100%;
  color: #fafafa !important;
  font-weight: bold !important;
  font-size: 1rem !important;
}
</style>
