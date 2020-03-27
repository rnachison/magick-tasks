<template>
<b-row class="justify-content-center">
  <b-col cols="10">
    <h2>
      Task List
      <b-link href="#/add-task">(Add Task)</b-link>
      <b-link @click="logout()">(Logout)</b-link>
    </h2>
    <div>
      <div>
        <b-card-group class="justify-content-center" deck>
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
    </div>
    <ul v-if="errors && errors.length">
    <li v-for="error of errors" :key="error.message">
      {{error.message}}
    </li>
  </ul>
  </b-col>
</b-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskList',
  data() {
    return {
      fields: [{
          key: 'title',
          label: 'Title',
          sortable: true,
          class: "text-left"
        },
        {
          key: 'notes',
          label: 'Notes',
          sortable: false,
          class: "text-left"
        },
        {
          key: 'isComplete',
          label: 'Completed',
          sortable: true,
          class: "text-left"
        },
        {
          key: 'createdAt',
          label: 'Created',
          sortable: true,
          class: "text-left"
        },
        {
          key: 'updatedAt',
          label: 'Updated',
          sortable: true,
          class: "text-left"
        },
        {
          key: 'actions',
          label: 'Action',
          sortable: false,
          class: "text-center",
          formatter: "details"
        }
      ],
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
        name: 'ViewTask',
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

<style lang="scss">

.card-deck {

  padding-left: 65px;
  padding-top: 30px;

  .card {
    -ms-flex: none;
    -webkit-box-flex: none;
    flex: none;
    height: 280px;
    width: 200px;
    background-color: #17141d;
    border-radius: 10px;
    box-shadow: -1rem 0 3rem #000;
    transition: 0.4s ease-out;
    position: relative;
    margin-left: -50px;
    left: 0;

    &:hover {
      transform: translateY(-20px);
      transition: 0.4s ease-out;
    }

    &:hover ~ .card {
      position: relative;
      left: 50px;
      transition: 0.4s ease-out;
    }
  }
}

</style>
