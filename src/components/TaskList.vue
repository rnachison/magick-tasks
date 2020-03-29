<template>
<div>
  <b-col cols="9">
    <h2>
      Task List
      <b-link href="#/add-task">(Add Task)</b-link>
      <b-link @click="logout()">(Logout)</b-link>
    </h2>
    <div class="deck-wrapper">
      <b-card-group deck
                    :class="{ noneChosen: chosenTask == null }">
        <b-card v-for="(task, index) of tasks"
                :key="index"
                @click.stop="chooseTask(index)"
                :class="{ chosen: chosenTask == index }">
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
            <b-button @click.stop="details(task)"
                      variant="primary">
                      Details
            </b-button>
          </div>
          <div class="back">
            DISPLAY BACK
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
import axios from 'axios';
import FooterDesk from './FooterDesk.vue';
import FooterCandles from './FooterCandles.vue';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      errors: [],
      chosenTask: null
    }
  },
  components: {
    FooterDesk,
    FooterCandles
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`/task`)
      .then(response => {
        this.tasks = response.data
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
    details(task) {
      if (task == null) {
        return;
      }
      this.$router.push({
        name: 'TaskListItem',
        params: {
          id: task.id
        }
      })
    },
    chooseTask(index) {
      this.chosenTask = this.chosenTask !== index ? index : null;
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

        &.noneChosen {
          .card {
            &:hover {
                transform: translateY(-20px);
                transition: 0.4s ease-out;
                width: $card-width - $card-pull;
            }
          }
        }

        .card {
            -ms-flex: none;
            -webkit-box-flex: none;
            flex: none;
            height: $card-height;
            width: $card-width;
            transition: 0.4s ease-out;
            position: relative;
            margin-left: $card-pull;
            margin-right: 0;
            margin-top: $card-pull / ($phi * $phi * $phi);
            background: transparent;
            border: none;
            z-index: 20;
            top: 0;
            left: 0;

            &.chosen {
              // left: 50%;
              // transform: translate(-50%, -50%);
              // top: 50%;
              // position: fixed;
              z-index: 100;
              transition: 0.4s ease-out;

              .card-body {

                .front {
                  transform: rotateY(180deg);
                  transition: 0.4s ease-out;
                }

                .back {
                  transform: rotateY(0deg);
                  width: $card-width * 2;
                  height: $card-height * 2;
                  transition: 0.4s ease-out;
                }
              }
            }

            .card-body {

              padding: 0;

              .front, .back {
                  padding: 1.25rem;
                  height: 100%;
                  left: 0;
                  position: absolute;
                  border-radius: 10px;
                  box-shadow: -1rem 0 3rem #000;
                  background: $Medieval-Illustrations-4-hex;
                  width: $card-width;
                  transition: 0.4s ease-out;
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                  transform-style: preserve-3d;
                  transform: rotateY(0);
              }

              .back {
                transform: rotateY(180deg);
              }
            }
        }
    }
}
</style>
