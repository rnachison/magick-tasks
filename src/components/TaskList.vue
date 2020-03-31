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
        <b-card v-for="(task, index) of tasks"
                :key="index"
                @click.stop="chooseTask(index)"
                :class="[{ chosen: chosenTask == index }, { unchosen: (chosenTask != index && oldTask == index) }]">
          <div class="front">
            <b-card-title>{{task.title}}</b-card-title>
            <b-card-text>
              <div>
                {{task.notes}}
              </div>
              <div v-if="task && task.dueDate">
                {{ task.dueDate | moment("dddd, MMMM Do YYYY") }}
              </div>
            </b-card-text>
          </div>
          <div class="back">
            <TaskForm :title="task.title"
                      :notes="task.notes"
                      :dueDate="task.dueDate"
                      @submit-task="updateTask(task, $event)" />
          </div>
        </b-card>
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
import TaskForm from './TaskForm.vue';

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
    TaskForm
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
    updateTask(task, updatedTask) {
      task.title = updatedTask.title;
      task.notes = updatedTask.notes;
      task.dueDate = updatedTask.dueDate;
      apiService.updateTask(task)
      .then(response => {
        console.log(response.status);
        //put back task card
        this.chosenTask = null;
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
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

<style lang="scss" scoped>

$card-width: 225px;
$card-height: $card-width * $phi;
$transition: 0.4s ease-out;
$animation-transition: 1s ease-out;

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
    width: 300px;

    @media (min-width: $breakpoint-md) {
      width: 450px;
    }

    @media (min-width: $breakpoint-lg) {
      width: 625px;
    }

    @media (min-width: $breakpoint-xl) {
      width: 800px;
    }

    .card-deck {

        margin-left: 50px;
        padding-left: 15px;

        .card {
            -ms-flex: none;
            -webkit-box-flex: none;
            flex: none;
            height: $card-height;
            width: $card-width;
            transition: $transition;
            position: relative;
            margin-left: $card-pull;
            margin-right: 0;
            margin-top: $card-pull / ($phi * $phi * $phi);
            background: transparent;
            border: none;
            z-index: 20;
            top: 0;
            left: 0;

            .card-body {

              padding: 0;

              .front, .back {
                  position: absolute;
                  left: 0;
                  height: $card-height;
                  width: $card-width;
                  padding: 1.25rem;
                  border-radius: 10px;
                  box-shadow: -1rem -.25rem 3rem #000;
                  background: $deep-red;
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                  transform-style: preserve-3d;
                  transition: $transition;
              }

              .front {
                position: absolute;
                left: 0;
                transform: rotateY(0);
              }

              .back {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%) rotateY(180deg);
              }
            }


            &:hover {
                top: -20px;
                transition: $transition;
                width: $card-width - $card-pull;
            }


            &.chosen {
              // left: 50%;
              // transform: translate(-50%, -50%);
              // top: 50%;
              // position: fixed;
              // z-index: 100;
              // transition: $transition;
              animation: card-chosen $animation-transition forwards;

              .card-body {

                .front {
                  // transform: rotateY(180deg);
                  // transition: $transition;
                  animation: front-chosen $animation-transition forwards;
                }

                .back {
                  // transform: translate(-50%,-50%) rotateY(0deg);
                  // width: $card-width * 2;
                  // height: $card-height * 2;
                  // max-width: 90%;
                  // max-height: 90%;
                  // transition: $transition;
                  animation: back-chosen $animation-transition forwards;
                }
              }
            }

            &.unchosen {

              animation: card-unchosen $animation-transition forwards;

              .front {
                animation: front-unchosen $animation-transition forwards;
              }

              .back {
                animation: back-unchosen $animation-transition forwards;
              }
            }
        }
    }
}

@keyframes card-chosen {
  0% {
    top: -20px;
    width: $card-width - $card-pull;
  }
  63% {
    top: -70px;
    width: $card-width - $card-pull;
  }
  100% {
    top: -70px;
    width: $card-width - $card-pull;
    z-index: 100;
  }
}

@keyframes front-chosen {
  0% {
    left: 0;
  }
  63% {
    left: -66px;
  }
  64%, 100% {
    left: -66px;
    transform: rotateY(180deg);
  }
}

@keyframes back-chosen {
  0% {
    transform: translate(-50%,-50%) rotateY(180deg);
    width: $card-width;
    height: $card-height;
  }
  64%, 100% {
    transform: translate(-50%,-50%) rotateY(0deg);
    width: $card-width * 2;
    height: $card-height * 2;
    max-width: 90%;
    max-height: 90%;
  }
}

@keyframes card-unchosen {
  0% {
    top: -70px;
    width: $card-width - $card-pull;
    z-index: 100;
  }
  25% {
    top: -70px;
    width: $card-width - $card-pull;
    z-index: 20;
  }
  100% {
    top: 0px;
    width: $card-width;
  }
}

@keyframes front-unchosen {
  0% {
    left: -66px;
    transform: rotateY(180deg);
  }
  25% {
    left: -66px;
    transform: rotateY(0deg);
  }
  100% {
    left: 0;
    transform: rotateY(0deg);
  }
}

@keyframes back-unchosen {
  0% {
    transform: translate(-50%,-50%) rotateY(0deg);
    width: $card-width * 2;
    height: $card-height * 2;
    max-width: 90%;
    max-height: 90%;
  }
  25% {
    transform: translate(-50%,-50%) rotateY(180deg);
    width: $card-width;
    height: $card-height;
  }
  100% {
    transform: translate(-50%,-50%) rotateY(180deg);
    width: $card-width;
    height: $card-height;
  }
}
</style>
