<template>
  <b-row class="justify-content-md-center form-container">
    <Header
      :showCredits="false"
    />
    <b-col cols="6">
      <h2>{{title}}</h2>
      <div v-if="errors && errors.length">
        <div
          v-for="error of errors"
          :key="error.message">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-form @submit.prevent="$emit('submit', userInfo)">
        <b-form-group
          horizontal
          :label-cols="4"
          breakpoint="md"
          label="Enter Username">
          <b-form-input
            id="username"
            v-model.trim="userInfo.username"
            required>
          </b-form-input>
        </b-form-group>
        <b-form-group
          horizontal
          :label-cols="4"
          breakpoint="md"
          label="Enter Password">
          <b-form-input
            type="password"
            id="password"
            v-model.trim="userInfo.password"
            required>
          </b-form-input>
        </b-form-group>
        <b-button
          type="submit">
          {{submitName}}
        </b-button>
        <b-button
          type="button"
          @click.stop="reroute()">
          {{routeName}}
        </b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    submitName: String,
    routeName: String,
    title: String,
    errors: Array
  },
  data () {
    return {
      userInfo: {},
    }
  },
  methods: {
    reroute () {
      if (this.routeName == 'Register') {
        this.$router.push({
          name: 'Register'
        })
      } else {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .form-container {
    .alert-info {
      color: $midnight-purple;
      background: $moon;
      border-color: $moon;
    }

    .btn, .btn:hover {
      background-color: $magic-orange;
      border-color: $magic-orange;
      color: $midnight-purple;
      margin: 10px;
    }
  }
</style>
