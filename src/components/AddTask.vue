<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Task
        <b-link href="#/">(Task List)</b-link>
      </h2>
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
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'

export default {

  name: 'AddTask',

  data() {
    return {
      task: {}
    };

  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post(`/task`, this.task)
      .then(response => {
        console.log(response.status);
        this.$router.push({
          name: 'TaskList'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  }
}
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
