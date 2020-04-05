<template>
<div id="task-list">
  <div id="overlay"
       :class="{ chosen: chosenTask != null }"
       @click.stop="closeTask()">
  </div>
  <b-col cols="9">
    <h2>
      Task List
      <b-link href="#/add-task">(Add Task)</b-link>
      <b-link @click="logout()">(Logout)</b-link>
    </h2>
    <CelestialToggle
      :onValue="'Completed'"
      :offValue="'Not Completed'"
      :index="0"
      :modelValue="showCompleteTasks"
      @toggle-change="toggleChange($event)" />
    <div class="deck-wrapper">
      <b-card-group
        v-if="!showCompleteTasks"
        deck>
        <TaskCard
          v-for="task of incompleteTasks"
          :key="task.id"
          :task="task"
          :isChosen="chosenTask == task.id"
          :isUnchosen="chosenTask != task.id && oldTask == task.id"
          @choose-task="chooseTask($event)"
          @close-task="closeTask()" />
      </b-card-group>
      <b-card-group
        v-if="showCompleteTasks"
        deck>
        <TaskCard
          v-for="task of completeTasks"
          :key="task.id"
          :task="task"
          :isChosen="chosenTask == task.id"
          :isUnchosen="chosenTask != task.id && oldTask == task.id"
          @choose-task="chooseTask($event)"
          @close-task="closeTask()" />
      </b-card-group>
    </div>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors"
          :key="error.message">
        {{error.message}}
      </li>
    </ul>
  </b-col>
  <FooterCandles />
  <FooterDesk />
</div>
</template>

<script>

import { APIService } from '../APIService';
import CelestialToggle from './CelestialToggle.vue';
import FooterDesk from './FooterDesk.vue';
import FooterCandles from './FooterCandles.vue';
import TaskCard from './TaskCard.vue';

const apiService = new APIService();

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      errors: [],
      chosenTask: null,
      oldTask: null,
      showCompleteTasks: false
    }
  },
  components: {
    CelestialToggle,
    FooterDesk,
    FooterCandles,
    TaskCard
  },
  created() {
    apiService.getTasks()
      .then(response => {
        this.tasks = response.data;
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
  computed: {
    incompleteTasks: function() {
      let incomplete = [];
      for (let task of this.tasks) {
        if (!task.isComplete) {
          incomplete.push(task);
        }
      }
      return incomplete;
    },
    completeTasks: function() {
      let complete = [];
      for (let task of this.tasks) {
        if (task.isComplete) {
          complete.push(task);
        }
      }
      return complete;
    }
  },
  methods: {
    chooseTask(index) {
      //choose task card
      this.oldTask = null;
      this.chosenTask = index;
    },
    closeTask() {
      //put back task card
      this.oldTask = this.chosenTask;
      this.chosenTask = null;
    },
    clearTasks() {
      this.oldTask = null;
      this.chosenTask = null;
    },
    toggleChange(emittedValue) {
      this.clearTasks();
      this.showCompleteTasks = emittedValue;
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
@import '../styles/tasks/task_list.scss';
</style>
