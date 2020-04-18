<template>
  <div id="header-container">
    <b-navbar fixed="top">
      <b-button
        class="header-link home-link"
        href="/">
        Tasks
      </b-button>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <span v-if="showCreate">
            <b-nav-text>
              <b-button
                class="header-link"
                href="#/add-task">
                  Add Task
              </b-button>
            </b-nav-text>
          </span>
          <span v-if="showCredits">
            <b-nav-text>
              <b-button
                class="header-link"
                href="#/credits">
                  Credits
              </b-button>
            </b-nav-text>
          </span>
          <span v-if="showLogout">
            <b-nav-text>
              <b-button
                class="header-link"
                @click="logout()">
                  Logout
              </b-button>
          </b-nav-text>
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

  #header-container {

    .navbar {

      .header-link.btn {
        background: rgba($moon, .63);
        margin-left: 10px;
        padding: 16px 10px;
        border-radius: 0 0 20px 20px;
        transform: translateY(-26px);
        transition: $transition;
        color: $blood-red;
        border: none;

        &.home-link {
          font-family: $title-font;
          font-size: 1.5em;
          transform: translateY(-22px);
        }

        &:hover {
          transition: $transition;
          transform: translateY(-20px);
          color: $purple;
          box-shadow: $magic-shadow;
          text-shadow: $magic-shadow;
        }
      }
    }
  }

</style>
