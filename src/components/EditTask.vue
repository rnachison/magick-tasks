<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Task
        <router-link :to="{ name: 'ViewTask', params: { id: taskId } }">(Show Task)</router-link>
      </h2>
      <div v-if="errors && errors.length">
        <div v-for="error of errors" :key="error.message">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Title"
          >
            <b-form-input id="title" v-model.trim="task.title"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Notes"
          >
            <b-form-textarea
              id="notes"
              v-model="task.notes"
              placeholder="Enter something"
              :rows="2"
              :max-rows="6"
            >{{task.notes}}</b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'

  export default {
    name: "EditTask",
    data() {
      return {
        taskId: this.$route.params.id,
        task: {},
        errors: []
      };
    },
    created () {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      axios.get(`http://localhost:3000/task/` + this.taskId)
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
      onSubmit(evt) {
        evt.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.put(`http://localhost:3000/task/` + this.taskId, this.task)
        .then(response => {
          console.log(response.status);
          this.$router.push({
            name: 'ViewTask',
            params: { id: this.taskId }
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
      }
    }
  };
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>
