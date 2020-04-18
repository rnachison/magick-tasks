<template>
  <b-form
    class="form-container"
    @submit.prevent="$emit('submit-task', task)">
    <b-form-group
      :label-cols="4"
      breakpoint="md"
      label="Title"
      :label-for="'title-' + id"
      :invalid-feedback="invalidFeedback"
      :state="state">
      <b-form-input
        :id="'title-' + id"
        v-model.trim="task.title"
        :state="state">
      </b-form-input>
    </b-form-group>
    <b-form-group
      :label-cols="4"
      breakpoint="md"
      label="Notes">
      <b-form-textarea
        :id="'notes-' + id"
        v-model="task.notes"
        placeholder="Enter notes"
        :rows="2"
        :max-rows="6">
          {{notes}}
      </b-form-textarea>
    </b-form-group>
    <b-form-group
      :label-cols="4"
      breakpoint="md"
      label="Due">
      <v-date-picker
        class="due-date"
        v-model="task.dueDate">
      </v-date-picker>
    </b-form-group>
    <CelestialToggle
      :onValue="'Completed'"
      :offValue="'Not Completed'"
      :id="id"
      :modelValue="task.isComplete"
      @toggle-change="toggleComplete($event)"
    />
    <!-- <b-form-checkbox
      :id="'is-complete-' + id"
      v-model="task.isComplete"
      name="is-complete">
      Complete
    </b-form-checkbox> -->
    <b-form-group
      breakpoint="md">
      <div class="button-wrapper">
        <b-button
          type="submit"
          class="save-button">
                  Save
        </b-button>
      </div>
      <div class="button-wrapper">
        <b-button
          variant="danger"
          @click.stop="$emit('discard-task', id)"
          class="destroy-button">
          Discard
        </b-button>
      </div>
    </b-form-group>
  </b-form>
</template>

<script>

import CelestialToggle from './CelestialToggle.vue';

export default {
  name: 'TaskForm',
  props: {
    title: String,
    notes: String,
    dueDate: Date,
    isComplete: Boolean,
    id: Number
  },
  data() {
    return {
      task: {}
    }
  },
  components: {
    CelestialToggle
  },
  computed: {
    state() {
      return this.title && this.title.length ? true : false;
    },
    invalidFeedback() {
      return 'This field is required';
    }
  },
  created () {
    this.task.title = this.title;
    this.task.notes = this.notes;
    this.task.isComplete = this.isComplete;
    this.task.dueDate = this.dueDate ? new Date(this.dueDate) : null;
  },
  methods: {
    toggleComplete(isComplete) {
      this.task.isComplete = isComplete;
    }
  }
}
</script>

<style lang="scss">
@import '../styles/tasks/task_form.scss';
</style>
