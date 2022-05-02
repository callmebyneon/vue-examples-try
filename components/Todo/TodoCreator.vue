<script>
  export default {
    name: 'TodoCreator',
    data () {
      return {
        title: '',
        invalidTitle: false,
        placeholder: 'What needs to be done?'
      }
    },
    methods: {
      createTodo () {
        if (this.invalidTitle === false) {
          this.$store.dispatch('todoApp/createTodo', this.title);
          this.title = '';
        }
      },
      handleInputChange (event) {
        const validatedTitle = event.target.value.trim();
        if (!validatedTitle) {
          this.title = this.title.trim();
          this.invalidTitle = true;
          return;
        }

        this.title = event.target.value;
        if (this.invalidTitle) this.invalidTitle = false;
      }
    }
  }
</script>

<template>
  <div class="todo-text-input">
    <input
      :class="{ invalid: invalidTitle === true }"
      :value="title"
      :placeholder="placeholder"
      type="text"
      @Input="handleInputChange"
      @keypress.enter="createTodo"
    >
  </div>
</template>

<style lang="scss">
  .todo-text-input {

    input[type='text'] {
      width: 100%;
      padding: 0.5em 1em 0.5em 2.6em;
      font-size: 1rem;
      border: 1px solid #4f4f4f;
      border-radius: 6px;
      font-family: inherit;
      line-height: 1em;

      &::placeholder {
        text-align: center;
        font-family: inherit;
        font-style: oblique;
      }
    }
  }
</style>