<template>
  <b-card
    @click.stop="$emit('choose-task', task.id)"
    :class="[{ chosen: isChosen}, { unchosen: isUnchosen }, { completed: task.isComplete }]">
    <div class="front">
      <img
        class="symbol"
        :src="getImgUrl(task.id)"
        alt="">
      <b-card-title>{{task.title}}</b-card-title>
      <b-card-text>
        <div class="task-notes">
          {{task.notes}}
        </div>
        <div
          v-if="dueDate"
          class="due-date">
          {{ dueDate | moment("MM/DD/YYYY - dddd") }}
        </div>
      </b-card-text>
    </div>
    <div class="back">
      <TaskForm
        :title="task.title"
        :notes="task.notes"
        :dueDate="dueDate"
        :isComplete="task.isComplete"
        :id="task.id"
        @submit-task="updateTask(task, $event)"
        @discard-task="discardTask($event)"
      />
    </div>
  </b-card>
</template>

<script>
import { APIService } from '../APIService';
import TaskForm from './TaskForm.vue';

const apiService = new APIService();

export default {
  name: 'TaskCard',
  props: {
    task: Object,
    isChosen: Boolean,
    isUnchosen: Boolean
  },
  data () {
    return {
      symbols: ['demon-bottle', 'dragon-bottle', 'eyeball', 'infinite-ouroboros', 'moon', 'moth', 'ouroboros', 'skull', 'sun']
    }
  },
  components: {
    TaskForm
  },
  computed: {
    dueDate () {
      return this.task.dueDate ? new Date(this.task.dueDate) : null;
    }
  },
  methods: {
    updateTask(task, updatedTask) {
      //put back task card
      this.$emit('close-task');
      task.title = updatedTask.title;
      task.notes = updatedTask.notes;
      task.dueDate = updatedTask.dueDate;
      task.isComplete = updatedTask.isComplete;
      apiService.updateTask(task)
      .then(response => {
        console.log(response.status);
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
    discardTask(id) {
      var isConfirm = confirm('Discarding will permanently destroy task');
      if (!isConfirm) {
        return false;
      }
      this.$emit('close-task');
      apiService.deleteTask(id)
      .then(response => {
        console.log(response.status);
        this.$emit('discard-task', id);
      })
      .catch(e => {
        if(e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    },
    getImgUrl(id) {
      var url = require.context('../assets/', false, /\.svg$/);
      var index = id % this.symbols.length;
      return url('./' + this.symbols[index] + '.svg');
    }
  }
}
</script>

<style lang="scss">
@import '../styles/tasks/task_card.scss';
</style>
