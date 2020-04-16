<template>
<div id="task-list">
  <Header
    :showLogout="true"
    :showCreate="true"
    :showCredits="true"
  />
  <div id="overlay"
       :class="{ chosen: chosenTask != null }"
       @click.stop="closeTask()">
  </div>
  <b-col
    cols="9"
    ref="deckContainer"
    :style="cssProps">
    <CelestialToggle
      :onValue="'Completed'"
      :offValue="'Not Completed'"
      :id="tasks.length"
      :modelValue="showCompleteTasks"
      @toggle-change="toggleChange($event)"
      class="show-complete-toggle"
    />
    <div class="deck-wrapper">
      <transition-group
        name="task-list"
        tag="div"
        class="card-deck">
        <TaskCard
          v-for="task of viewableTasks"
          :key="task.id"
          :task="task"
          :isChosen="chosenTask == task.id"
          :isUnchosen="chosenTask != task.id && oldTask == task.id"
          @choose-task="chooseTask($event)"
          @close-task="closeTask()"
          @delete-task="deleteTask($event)" />
      </transition-group>
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
import Header from './Header.vue';
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
      showCompleteTasks: false,
      rowLength: 0
    }
  },
  components: {
    CelestialToggle,
    FooterDesk,
    FooterCandles,
    Header,
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
  mounted () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  computed: {
    viewableTasks: function() {
      let taskArray = [];
      for (let task of this.tasks) {
        if (!this.showCompleteTasks && !task.isComplete) {
          taskArray.push(task);
        }
        if (this.showCompleteTasks && task.isComplete) {
          taskArray.push(task);
        }
      }
      return taskArray;
    },
    cssProps() {
      return {
        '--row-length': this.rowLength
      }
    }
  },
  methods: {
    chooseTask(id) {
      //choose task card
      this.oldTask = null;
      this.chosenTask = id;
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
    deleteTask(id) {
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id == id) {
          this.tasks.splice(i, 1);
          return;
        }
      }
    },
    toggleChange(emittedValue) {
      this.clearTasks();
      this.showCompleteTasks = emittedValue;
    },
    handleResize() {
      var deckContainerWidth = this.$refs.deckContainer.clientWidth;
      this.rowLength = Math.floor((deckContainerWidth - 100) / 175);
    }
  },
  destroyed() {
      window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style lang="scss">
@import '../styles/tasks/task_list.scss';
</style>
