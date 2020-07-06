import Vue from 'vue';
import vuetify from '../../plugins/vuetify';
import RegistrationForm from './RegistrationForm.vue';

new Vue({
  el: '#registration-form',
  template: '<RegistrationForm />',
  components: {
    RegistrationForm,
  },
  vuetify,
})