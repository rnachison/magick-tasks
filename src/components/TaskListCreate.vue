<template>
  <div>
    <b-col cols="9">
      <h2>
        Add Task
        <b-link href="#/">(Task List)</b-link>
      </h2>
      <b-jumbotron class="form-container">
        <b-form @submit="onSubmit">
          <b-form-group horizontal
                        :label-cols="4"
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
          <b-form-group horizontal
                        :label-cols="4"
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
          <b-form-group horizontal
                        :label-cols="4"
                        breakpoint="md"
                        label="Due">
            <b-form-datepicker id="dueDate"
                               v-model="task.dueDate"
                               label="Due Date"
                               value-as-date >
             </b-form-datepicker>
          </b-form-group>
          <b-button type="submit"
                    variant="primary">
                    Save
          </b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
    <FooterCandles />
    <FooterDesk />
  </div>
</template>

<script>

import { APIService } from '../APIService';
import FooterDesk from './FooterDesk.vue';
import FooterCandles from './FooterCandles.vue';

const apiService = new APIService();

export default {

  name: 'TaskListCreate',
  data() {
    return {
      task: {}
    };

  },
  components: {
    FooterDesk,
    FooterCandles
  },
  computed: {
    state() {
      return this.task && this.task.title && this.task.title.length ? true : false;
    },
    invalidFeedback() {
      return 'This field is required';
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      apiService.createTask(this.task)
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
    }
  }
}
</script>
<style lang="scss" scoped>

.form-container {
  background: $Medieval-Illustrations-4-hex;
}

</style>
