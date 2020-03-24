<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Task List
        <b-link href="#/add-task">(Add Task)</b-link>
        <b-link @click="logout()">(Logout)</b-link>
      </h2>
      <b-table striped hover :items="tasks" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
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
  data () {
    return {
      fields: [
          {
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
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`http://localhost:3000/task`)
    .then(response => {
      this.tasks = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })
  },
  methods: {
    details (task) {
      if (task == null) {
        return;
      }
      this.$router.push({
        name: 'ShowTask',
        params: { id: task._id }
      })
    },
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
