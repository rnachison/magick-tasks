<template>
  <b-form @submit="$emit('submit-task')">
    <b-form-group :label-cols="4"
                  breakpoint="md"
                  label="Title"
                  label-for="title"
                  :invalid-feedback="invalidFeedback"
                  :state="state">
      <b-form-input id="title"
                    v-model.trim="task.title"
                    :state="state">
      </b-form-input>
    </b-form-group>
    <b-form-group :label-cols="4"
                  breakpoint="md"
                  label="Notes">
      <b-form-textarea id="notes"
                       v-model="task.notes"
                       placeholder="Enter notes"
                       :rows="2"
                       :max-rows="6">
         {{task.notes}}
       </b-form-textarea>
    </b-form-group>
    <b-form-group :label-cols="4"
                  breakpoint="md"
                  label="Due">
      <b-form-datepicker id="dueDate"
                         v-model="task.dueDate"
                         label="Due Date"
                         value-as-date >
       </b-form-datepicker>
    </b-form-group>
    <b-button type="submit"
              variant="primary"
              class="save-button">
              Save
    </b-button>
  </b-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: Object
  },
  computed: {
    state() {
      return this.task && this.task.title && this.task.title.length ? true : false;
    },
    invalidFeedback() {
      return 'This field is required';
    }
  }
}
</script>

<style lang="scss" scoped>

.save-button {

  position: relative;

  &:before {
    content: '';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    // border-radius:50%;
    background: #d35400;
    transition: .5s;
    transform: scale(.9);
    z-index: -1;
  }

  &:hover {
    color: #ffa502;
    box-shadow: 0 0 15px #d35400;
    text-shadow: 0 0 15px #d35400;

    &:before {
      transform: scale(1.2);
      box-shadow: 0 0 15px #d35400;
      filter: blur(3px);
    }
  }
}

</style>
