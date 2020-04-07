<template>
  <div class="header-container">
    <b-navbar type="light" fixed="top">
      <b-navbar-brand tag="h1">Tasks</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :disabled="!showCreate"
            href="#/add-task">
            Add Task
          </b-nav-item>
          <b-nav-item
            href="#/credits">
            Credits
          </b-nav-item>
          <b-button
            @click="logout()"
            :disabled="!showLogout">
            Logout
        </b-button>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    showLogout: Boolean,
    showCreate: Boolean
  },
  methods: {
    logout() {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
