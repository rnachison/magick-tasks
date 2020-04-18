<template>
  <UserForm
    :title="'Login'"
    :submitName="'Login'"
    :routeName="'Register'"
    :errors="errors"
    @submit="onSubmit($event)"
  />
</template>

<script>

import { APIService } from '../APIService';
import UserForm from './UserForm.vue';
const apiService = new APIService();

export default {
  name: 'Login',
  components: {
    UserForm
  },
  data() {
    return {
      errors: []
    }
  },
  methods: {
    onSubmit (userInfo) {
      apiService.login(userInfo)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.token)
        this.$router.push({
          name: 'TaskList'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
    register () {
      this.$router.push({
        name: 'Register'
      })
    }
  }
}
</script>
