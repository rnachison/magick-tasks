<template>
<b-container>
  <b-row class="justify-content-center">
    <b-col cols="10">
      <h2>
        Task List
        <b-link href="#/add-task">(Add Task)</b-link>
        <b-link @click="logout()">(Logout)</b-link>
      </h2>
      <div class="deck-wrapper">
        <b-card-group deck>
          <b-card v-for="task of tasks" :key="task.id">
            <b-card-title>{{task.title}}</b-card-title>
            <b-card-text>
              <div>
                {{task.notes}}
              </div>
              <div>
                {{ task.createdAt | moment("dddd, MMMM Do YYYY") }}
              </div>
            </b-card-text>
            <b-button @click.stop="details(task)" variant="primary">Details</b-button>
          </b-card>
        </b-card-group>
      </div>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error.message">
          {{error.message}}
        </li>
      </ul>
    </b-col>
    <b-col cols="2">
      <div class="candle-wrapper">
        <img src="../assets/40144.png" alt="candles" class="img-fluid">
      </div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      errors: []
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/task`)
      .then(response => {
        this.tasks = response.data
      })
      .catch(e => {
        this.errors.push(e)
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
  },
  methods: {
    details(task) {
      if (task == null) {
        return;
      }
      this.$router.push({
        name: 'TaskListItem',
        params: {
          id: task.id
        }
      })
    },
    logout() {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

$card-width: 225px;
$card-height: $card-width * $phi;

h2 {
  margin-top: 60px;
}

.candle-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 37%;
}

.deck-wrapper {

  padding: 60px 0px;

  .card-deck {

    margin-left: 50px;
    padding-left: 15px;

    .card {
      -ms-flex: none;
      -webkit-box-flex: none;
      flex: none;
      height: $card-height;
      width: $card-width;
      transition: 0.4s ease-out;
      position: relative;
      margin-left: $card-pull;
      margin-right: 0;
      margin-top: $card-pull / ($phi * $phi * $phi);
      background: transparent;
      border: none;

      &:hover {
        transform: translateY(-20px);
        transition: 0.4s ease-out;
        width: $card-width - $card-pull;
      }

      .card-body {
        left: 0;
        position: relative;
        border-radius: 10px;
        box-shadow: -1rem 0 3rem #000;
        background: $Medieval-Illustrations-4-hex;
        width: $card-width;
      }
    }
  }
}
</style>
