<template>
  <div id="add-task">
    <Header
      :showLogout="true"
      :showCredits="true"
    />
    <b-col cols="9">
      <h2>
        Add Task
        <b-link href="#/">(Task List)</b-link>
      </h2>
      <TaskForm @submit-task="createTask($event)" />
    </b-col>
    <FooterCandles />
    <FooterDesk />
  </div>
</template>

<script>

import { APIService } from '../APIService';
import FooterDesk from './FooterDesk.vue';
import FooterCandles from './FooterCandles.vue';
import Header from './Header.vue';
import TaskForm from './TaskForm.vue';

const apiService = new APIService();

export default {

  name: 'TaskListCreate',
  components: {
    FooterDesk,
    FooterCandles,
    Header,
    TaskForm
  },
  methods: {
    createTask(task) {
      apiService.createTask(task)
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
<style lang="scss" scoped>
  #add-task {
    padding-bottom: 50px;
  }
</style>
