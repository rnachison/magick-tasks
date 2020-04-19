<template>
  <UserForm
    :title="'Please Register'"
    :errors="errors"
    :submitName="'Register'"
    :routeName="'Cancel'"
    @submit="onSubmit($event)"
  />
</template>

<script>

import { APIService } from '../APIService';
import UserForm from './UserForm.vue';
const apiService = new APIService();

export default {
  name: 'Register',
  data () {
    return {
      errors: []
    }
  },
  components: {
    UserForm
  },
  methods: {
    onSubmit (userInfo) {
      apiService.register(userInfo)
      .then(response => {
        console.log(response.status);
        alert("Success!")
        this.$router.push({
          name: 'Login'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
  }
}
</script>
