<template>
  <div class="header-container">
    <b-navbar type="light" fixed="top">
      <h1>
        <b-navbar-brand href="/">Tasks</b-navbar-brand>
      </h1>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <span v-if="showCreate">
            <b-nav-item href="#/add-task">
              Add Task
            </b-nav-item>
          </span>
          <span v-if="showCredits">
            <b-nav-item
              href="#/credits">
              Credits
            </b-nav-item>
          </span>
          <span v-if="showLogout">
            <b-nav-item @click="logout()">
              Logout
          </b-nav-item>
          </span>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    showLogout: Boolean,
    showCreate: Boolean,
    showCredits: Boolean
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

  .header-container {

    .navbar {
      // background: rgba(0,0,0,.63);
    }
  }

</style>
