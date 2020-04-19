<template>
  <div id="add-task">
    <Header
      :showLogout="true"
      :showCredits="true"
    />
    <div
      id="overlay"
      :class="{ loading: isLoading }">
      <img
        src="../assets/hourglass.svg"
        alt="hourglass"
        id="hourglass"
      />
    </div>
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
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    createTask(task) {
      this.isLoading = true;
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
  #add-task {

    #overlay {
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.8);
      opacity: 0;
      pointer-events: none;
      z-index: 1000;
      transition: $transition;

      #hourglass {
        top: 37%;
        left: 50%;
        position: fixed;
        transform: translate(-50%,-50%) rotate(0deg);
        animation: hourglass-spin 2s ease-in-out infinite;
      }

      &.loading {
        opacity: 1;
        transition: $transition;
        pointer-events: all;
      }
    }
  }

  @keyframes hourglass-spin {
    0% {
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }
</style>
