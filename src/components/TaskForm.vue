<template>
  <b-form @submit.prevent="$emit('submit-task', task)">
    <b-form-group
      :label-cols="4"
      breakpoint="md"
      label="Title"
      :label-for="'title-' + index"
      :invalid-feedback="invalidFeedback"
      :state="state">
      <b-form-input
        :id="'title-' + index"
        v-model.trim="task.title"
        :state="state">
      </b-form-input>
    </b-form-group>
    <b-form-group
      :label-cols="4"
      breakpoint="md"
      label="Notes">
      <b-form-textarea
        :id="'notes-' + index"
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
    <b-form-checkbox
      :id="'is-complete-' + index"
      v-model="task.isComplete"
      name="is-complete">
      Complete
    </b-form-checkbox>
    <b-button type="submit"
              class="save-button">
              Save
    </b-button>
  </b-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    title: String,
    notes: String,
    dueDate: Date,
    isComplete: Boolean,
    index: Number
  },
  data() {
    return {
      task: {}
    }
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
    this.index = this.index ? this.index : 0;
  },
}
</script>

<style lang="scss">
@import '../styles/tasks/task_form.scss';
</style>
