<template>
  <v-form class="login-form" lazy-validation>
    <v-radio-group v-model="loginType" hide-details row>
      <v-radio label="휴대폰번호" value="phone" input-value="true" style="font-size: 10px;"></v-radio>
      <v-radio label="이메일" value="email"></v-radio>
      <v-radio label="멤버쉽" value="membership"></v-radio>
    </v-radio-group>

    <v-text-field
      class="mt-4"
      v-model="id"
      label="아이디"
      required
    ></v-text-field>

    <v-text-field
      class="mt-4"
      v-model="password"
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      label="비밀번호"
      type="password"
      @keyup.enter="login"
      required
    ></v-text-field>

    <v-container class="mt-6">
      <v-row>
        <v-btn class="login-btn" color="#4a2b46" large @click="login">로그인</v-btn>
      </v-row>
      <v-row>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  data() {
    return {
      loginType: 'phone',
      id: '',
      email: '',
      password: '',
    };
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    goTo(pathName) {
      this.$router.push({name: pathName})
    },
    checkUser() {
      console.log(this.$store.getters.getUser)
    },
    clear() {
      this.$v.$reset()
      this.email = '';
      this.password = '';
    },
    closeSignupModal() {
      this.dialog = !this.dialog;
      this.$refs.signup.clear();
    },
    login() {
      this.$v.$touch()
      if (this.$v.invalid) {
        console.log('Validation Error!!')
        } else {
          if (this.loginType === 'email') {
            this.email = this.id
          } else {
            this.email = this.id + '@srticket.com'
          }
          this.$store.dispatch('userSignin', {email: this.email, password: this.password})
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
    }
  }
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
