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
    <div class="deck-wrapper">
      <b-card-group deck>
        <TaskCard
          v-for="task of incompleteTasks"
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
      oldTask: null
    }
  },
  components: {
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

#overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 50;
  opacity: 0;
  transition: $transition;
  background: #000;
  pointer-events: none;

  &.chosen {
    opacity: .5;
    pointer-events: auto;
    transition: $transition;
  }
}

.deck-wrapper {

    padding: 60px 0;
    width: 350px;

    @media (min-width: $breakpoint-md) {
      width: 500px;
    }

    @media (min-width: $breakpoint-lg) {
      width: 675px;
    }

    @media (min-width: $breakpoint-xl) {
      width: 850px;
    }

    .card-deck {

        margin-left: 50px;
        padding-left: 15px;

    }
}

</style>
