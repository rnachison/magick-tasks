<template>
  <b-card
    @click.stop="$emit('choose-task', task.id)"
    :class="[{ chosen: isChosen}, { unchosen: isUnchosen }, { completed: task.isComplete }]">
    <div class="front">
      <b-card-title>{{task.title}}</b-card-title>
      <b-card-text>
        <div>
          {{task.notes}}
        </div>
        <div v-if="dueDate">
          {{ dueDate | moment("dddd, MMMM Do YYYY") }}
        </div>
      </b-card-text>
    </div>
    <div class="back">
      <TaskForm
        :title="task.title"
        :notes="task.notes"
        :dueDate="task.dueDate"
        :isComplete="task.isComplete"
        :index="task.id"
        @submit-task="updateTask(task, $event)" />
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
  components: {
    TaskForm
  },
  computed: {
    dueDate () {
      return this.task.dueDate;
    }
  },
  methods: {
    updateTask(task, updatedTask) {
      task.title = updatedTask.title;
      task.notes = updatedTask.notes;
      task.dueDate = updatedTask.dueDate;
      task.isComplete = updatedTask.isComplete;
      apiService.updateTask(task)
      .then(response => {
        console.log(response.status);
        //put back task card
        this.$emit('close-task');
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../styles/tasks/task_card.scss';
</style>
