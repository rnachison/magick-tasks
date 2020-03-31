<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Task List
        <b-link href="#/">(Task List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">{{task.title}}</template>
        <template slot="lead">
          Notes: {{task.notes}}
          <br>
          Due: {{task.dueDate}}
          <br>
          Update At: {{task.updatedAt}}
          <br>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editTask(task.id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteTask(task.id)">Delete</b-btn>
      </b-jumbotron>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error.message">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import { APIService } from '../APIService';
const apiService = new APIService();

export default {
  name: 'TaskListItem',
  data () {
    return {
      task: '',
      taskId: parseInt(this.$route.params.id),
      errors: []
    }
  },
  created () {
    apiService.getTask(this.taskId)
    .then(response => {
      this.task = response.data
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
    editTask(id) {
      this.$router.push({
        name: "TaskListEdit",
        params: { id: id }
      });
    },
    deleteTask(id) {
      apiService.deleteTask(id)
      .then(response => {
        console.log(response.status);
        this.$router.push({
          name: 'TaskList'
        });
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
    logout () {
      localStorage.removeItem('jwtToken')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .edit-btn {
    margin-right: 20px;
    width: 70px;
}
</style>
