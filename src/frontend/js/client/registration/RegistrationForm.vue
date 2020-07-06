<template>
  <v-container>
    <v-card class="registration-form__container" @submit.prevent="registerUser">
      <v-form
        ref="form"
        class="registration-form"
        v-model="valid"
      >
        <div v-if="validationMessage">
          {{ validationMessage }}
        </div>
        <v-text-field
          v-model="email"
          label="Email"
          :rules="rules.email"
          required
        />
  
       <v-text-field
          v-model="username"
          label="Username"
          :rules="rules.username"
          required
        />
  
        <v-text-field
          v-model="password"
          label="Password"
          :rules="rules.password"
          required
          type="password"
        />
  
        <v-text-field
          v-model="confirmPassword"
          label="Confirm password"
          :rules="rules.passwordsMatch"
          required
          type="password"
        />
  
        <v-btn 
          type="submit"
          :disabled="!valid"
        >
          Register
        </v-btn>
        
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { Prop, Emit } from 'vue-property-decorator'
import { log } from 'util';
interface RegistrationFormState {
  valid: boolean;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  validationMessage: string;

}
export default Vue.extend({
  name: 'RegistrationForm',

  data: (): RegistrationFormState => ({
    valid: false,
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    validationMessage: '',
  }),

  computed: {
    rules() {
      return {
        email: [v => v.length > 1 || 'Email too short'],
        username: [v => v.length > 1 || 'Username too short'],
        password: [v => v.length > 3 || 'Password too short'],
        passwordsMatch: [v => this.password === this.confirmPassword && !!this.confirmPassword || 'Passwords do not match'],
      }
    }
  },

  methods: {
    async registerUser() {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }

      const response = await axios.post('/register', {
        username: this.username,
        password: this.password,
        email: this.email,
      });

      if (response.data.statusCode === 200) {
        window.location.assign('/');
      } else {
        this.validationMessage = response.data.message;
      }
    }
  }
})
</script>

<style lang="css" scoped>
  .registration-form {
      padding: 25px;
  }
  .registration-form__container {
    width: 800px;
    margin: 0 auto;
  }
</style>