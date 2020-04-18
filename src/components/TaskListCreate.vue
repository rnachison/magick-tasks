<template>
  <div id="add-task">
    <Header
      :showLogout="true"
      :showCredits="true"
    />
    <b-col cols="9">
      <div class="deck-wrapper">
        <div class="card-deck">
          <b-card
            class="chosen">
            <div class="back">
              <TaskForm
                :id="0"
                @submit-task="createTask($event)"
                @discard-task="discardTask()"
              />
            </div>
          </b-card>
        </div>
      </div>
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
    },
    discardTask() {
      this.$router.push({
        name: 'TaskList'
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
